import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Grid, Alert,
  List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Radio, FormControlLabel, CircularProgress
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

// Configuration flags for future features
const CONFIG = {
  ENABLE_MULTIPLE_ADDRESSES: false, // Future feature to allow multiple addresses
  ENABLE_ADDRESS_VALIDATION: false, // Future feature for CEP/address validation
  ENABLE_MAP_INTEGRATION: false, // Future feature for map integration
  ENABLE_ADDRESS_LABELS: false, // Future feature to label addresses (home, work, etc.)
};

interface AddressFormData {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  label?: string; // Future: for address labels
}

const INITIAL_FORM: AddressFormData = {
  street: '', number: '', complement: '', neighborhood: '', city: '', state: '', postalCode: ''
};

const AddressForm: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<AddressFormData[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/users/me');
      setAddresses(data.address ? [data.address] : []);
      setError('');
    } catch (err) {
      console.error('Erro ao carregar endereços:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Sua sessão expirou. Por favor, faça login novamente.');
      } else {
        setError('Erro ao carregar endereços. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateForm = (): boolean => {
    const requiredFields = ['street', 'number', 'neighborhood', 'city', 'state', 'postalCode'];
    const hasEmpty = requiredFields.some(field => !formData[field as keyof AddressFormData]);
    setTouched(Object.fromEntries(requiredFields.map(field => [field, true])));
    
    if (hasEmpty) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return false;
    }

    // Future: Add CEP validation when ENABLE_ADDRESS_VALIDATION is true
    if (CONFIG.ENABLE_ADDRESS_VALIDATION) {
      const cepRegex = /^\d{5}-?\d{3}$/;
      if (!cepRegex.test(formData.postalCode)) {
        setError('CEP inválido. Use o formato: 00000-000');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isAddingNew) {
      if (selectedAddress) {
        clearCart();
        return navigate('/order-confirmation');
      }
      return setError('Por favor, selecione um endereço ou adicione um novo.');
    }

    if (!validateForm()) return;

    try {
      setLoading(true);
      await axios.post('/api/users/address', formData);
      await fetchAddresses();
      resetForm();
      setSelectedAddress('0');
      setIsAddingNew(false);
    } catch (err) {
      console.error('Erro ao salvar endereço:', err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) setError('Sua sessão expirou. Por favor, faça login novamente.');
        else if (err.response?.status === 400) setError(err.response.data.message || 'Erro ao salvar endereço.');
        else setError('Erro ao salvar endereço. Tente novamente.');
      } else setError('Erro ao salvar endereço. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
    setTouched({});
  };

  const handleDeleteAddress = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/users/address');
      await fetchAddresses();
      setSelectedAddress('');
    } catch (err) {
      console.error('Erro ao deletar endereço:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('Sua sessão expirou. Por favor, faça login novamente.');
      } else {
        setError('Erro ao deletar endereço. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Endereços de Entrega</Typography>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {loading && <Box sx={{ textAlign: 'center', mb: 2 }}><CircularProgress /></Box>}

      {!isAddingNew && addresses.length > 0 && (
        <List>
          {addresses.map((address, index) => (
            <Paper key={index} sx={{ mb: 2 }}>
              <ListItem>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedAddress === String(index)}
                      onChange={() => setSelectedAddress(String(index))}
                      disabled={!CONFIG.ENABLE_MULTIPLE_ADDRESSES && addresses.length > 1}
                    />
                  }
                  label={`${address.street}, ${address.number}${address.complement ? ` - ${address.complement}` : ''}`}
                />
                <ListItemText
                  primary={CONFIG.ENABLE_ADDRESS_LABELS && address.label ? address.label : undefined}
                  secondary={`${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`}
                />
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    aria-label="delete" 
                    onClick={handleDeleteAddress}
                    disabled={!CONFIG.ENABLE_MULTIPLE_ADDRESSES && addresses.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      {(!addresses.length || isAddingNew) && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {['street', 'number', 'complement', 'neighborhood', 'city', 'state', 'postalCode'].map((field) => (
              <Grid key={field} item xs={12} sm={field === 'number' ? 2 : field === 'complement' ? 4 : 6}>
                <TextField
                  fullWidth
                  label={field === 'postalCode' ? 'CEP' : field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={formData[field as keyof AddressFormData] || ''}
                  onChange={handleInputChange}
                  error={touched[field] && !formData[field as keyof AddressFormData]}
                  helperText={touched[field] && !formData[field as keyof AddressFormData] && field !== 'complement' ? 'Campo obrigatório' : ''}
                  required={field !== 'complement'}
                />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
            {isAddingNew ? (
              <>
                <Button variant="outlined" onClick={() => { setIsAddingNew(false); resetForm(); }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Salvar Endereço'}
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" onClick={() => setIsAddingNew(true)} startIcon={<AddIcon />}>
                Adicionar Novo Endereço
              </Button>
            )}
          </Box>
        </form>
      )}

      {!isAddingNew && (
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedAddress || loading}>
            {loading ? <CircularProgress size={24} /> : 'Continuar para Confirmação'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AddressForm; 