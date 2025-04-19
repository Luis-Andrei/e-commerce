import React, { useState, useEffect } from 'react';
import { Box, Alert, CircularProgress } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Autocomplete } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  lat: number;
  lng: number;
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: Address) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ onAddressSelect }) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Verificar se a API do Google Maps está carregada
    if (window.google && window.google.maps) {
      console.log('Google Maps API carregada com sucesso');
    } else {
      console.error('Google Maps API não está carregada');
      setError('Erro ao carregar o serviço de busca de endereços');
    }
  }, []);

  const onLoad = (autoComplete: google.maps.places.Autocomplete) => {
    console.log('Autocomplete carregado com sucesso');
    setAutocomplete(autoComplete);
    setError(null);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) {
      console.error('Autocomplete não está inicializado');
      setError('Serviço de busca não está inicializado');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const place = autocomplete.getPlace();
      console.log('Place selecionado:', place);

      if (!place.geometry || !place.geometry.location) {
        console.error('Endereço sem geometria:', place);
        setError('Por favor, selecione um endereço da lista de sugestões');
        return;
      }

      const addressComponents = place.address_components || [];
      console.log('Componentes do endereço:', addressComponents);

      const getAddressComponent = (types: string[]): string => {
        const component = addressComponents.find(comp => 
          types.some(type => comp.types.includes(type))
        );
        if (!component) {
          console.log(`Componente não encontrado para tipos:`, types);
        }
        return component ? component.long_name : '';
      };

      const address: Address = {
        street: getAddressComponent(['route', 'street_address']) || '',
        number: getAddressComponent(['street_number']) || 'S/N',
        neighborhood: getAddressComponent(['sublocality', 'sublocality_level_1', 'neighborhood']) || '',
        city: getAddressComponent(['administrative_area_level_2', 'locality']) || '',
        state: getAddressComponent(['administrative_area_level_1']) || '',
        postalCode: getAddressComponent(['postal_code']) || '',
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      console.log('Endereço formatado:', address);

      // Validar campos obrigatórios
      const requiredFields = ['street', 'city', 'state', 'postalCode'];
      const missingFields = requiredFields.filter(field => !address[field as keyof Address]);

      if (missingFields.length > 0) {
        console.error('Campos obrigatórios faltando:', missingFields);
        setError(`Campos obrigatórios não encontrados: ${missingFields.join(', ')}`);
        return;
      }

      onAddressSelect(address);
      setSearchText(place.formatted_address || '');
    } catch (error) {
      console.error('Erro ao processar endereço:', error);
      setError('Erro ao processar o endereço selecionado');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        options={{
          componentRestrictions: { country: 'br' },
          fields: ['address_components', 'geometry', 'formatted_address', 'name'],
          types: ['address']
        }}
      >
        <TextField
          fullWidth
          label="Buscar endereço"
          placeholder="Digite seu endereço completo"
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            console.log('Texto de busca:', e.target.value);
          }}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOnIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <SearchIcon color="action" />
                )}
              </InputAdornment>
            )
          }}
        />
      </Autocomplete>
    </>
  );
};

export default AddressAutocomplete; 