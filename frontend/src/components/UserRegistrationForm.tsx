import React from 'react';
import { 
  Button, 
  Container, 
  TextField, 
  Typography, 
  Box, 
  Paper,
  Alert,
  Divider 
} from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { LoadScript } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import AddressAutocomplete from './AddressAutocomplete';

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

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: Address | null;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha precisa ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
  address: Yup.object().shape({
    street: Yup.string().required('Rua é obrigatória'),
    number: Yup.string().required('Número é obrigatório'),
    neighborhood: Yup.string().required('Bairro é obrigatório'),
    city: Yup.string().required('Cidade é obrigatória'),
    state: Yup.string().required('Estado é obrigatório'),
    postalCode: Yup.string().required('CEP é obrigatório'),
    lat: Yup.number().required('Latitude é obrigatória'),
    lng: Yup.number().required('Longitude é obrigatória')
  }).nullable().required('Endereço é obrigatório')
});

const UserRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState<string>('');

  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: null
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      setSubmitError('');
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          address: values.address
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar conta');
      }

      // Salva o token e dados do usuário
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redireciona para a página principal
      navigate('/');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro ao criar conta');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Criar Conta
        </Typography>

        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitError}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue, isSubmitting }) => (
            <Form noValidate>
              <Field
                as={TextField}
                label="Nome completo"
                name="name"
                fullWidth
                margin="normal"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <Field
                as={TextField}
                label="Senha"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <Field
                as={TextField}
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                fullWidth
                margin="normal"
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Endereço de Entrega
              </Typography>

              <LoadScript
                googleMapsApiKey="SUA_CHAVE_API_AQUI"
                libraries={['places']}
              >
                <AddressAutocomplete 
                  onAddressSelect={(address) => setFieldValue('address', address)} 
                />
              </LoadScript>

              {values.address && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  <Typography variant="body1">
                    {values.address.street}, {values.address.number}
                    {values.address.complement && `, ${values.address.complement}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {values.address.neighborhood}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {values.address.city} - {values.address.state}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    CEP: {values.address.postalCode}
                  </Typography>
                </Box>
              )}

              {touched.address && typeof errors.address === 'string' && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.address}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={isSubmitting || !values.address}
              >
                {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
              </Button>

              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/login')}
              >
                Já tem uma conta? Faça login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default UserRegistrationForm; 