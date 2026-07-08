import React, { useState, useEffect } from 'react';
import './App.css';

export default function Formulario() {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [hasError, setHasError] = useState(false);
  const [cepValido, setCepValido] = useState(false);

  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.erro) {
            setHasError(true);
            setStreet('');
            setNeighborhood('');
            setUf('');
            setCity('');
            setCepValido(false);
          } else {
            setHasError(false);
            setStreet(data.logradouro || '');
            setNeighborhood(data.bairro || '');
            setUf(data.uf || '');
            setCity(data.localidade || '');
            setCepValido(true);
          }
        })
        .catch(() => {
          setHasError(true);
        });
    } else {
      setHasError(false);
      setStreet('');
      setNeighborhood('');
      setUf('');
      setCity('');
      setCepValido(false);
    }
  }, [cep]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        
        <input 
          type="text" 
          id="cep" 
          placeholder="CEP" 
          value={cep}
          required={true} 
          onChange={(e) => setCep(e.target.value)} 
          maxLength={9}
        />
        
        <div id="cepError" className={hasError ? '' : 'hidden'}>
          O CEP informado é inválido.
        </div>
        
        <input 
          type="text" 
          id="street" 
          placeholder="Avenida Primeiro de Maio" 
          value={street}
          disabled={cepValido}
          required={true}  
          onChange={(e) => setStreet(e.target.value)} 
        />
        
        <input 
          type="text" 
          id="number" 
          placeholder="Número" 
          value={number} 
          onChange={(e) => setNumber(e.target.value)}
        />
        
        <input 
          type="text" 
          id="neighborhood" 
          placeholder="Bairro" 
          value={neighborhood}
          disabled={cepValido}
          required={true} 
          onChange={(e) => setNeighborhood(e.target.value)} 
        />
        
        <input 
          type="text" 
          id="uf" 
          placeholder="Estado" 
          value={uf}
          disabled={cepValido}  
          required={true}
          onChange={(e) => setUf(e.target.value)} 
        />
        
        <input 
          type="text" 
          id="city" 
          placeholder="Cidade" 
          value={city}
          disabled={cepValido}
          required={true}  
          onChange={(e) => setCity(e.target.value)} 
        />
        <button type="submit">Cadastrar Endereço</button>
      </form>
    </main>
  );
}
