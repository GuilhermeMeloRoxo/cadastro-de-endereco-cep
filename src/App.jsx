import './App.css'
import { useState, useEffect } from 'react';

export default function CepForm() {
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {

    if (cep === 8) {
      fetch(`https://viacep.com.br{cleanCep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (data.erro) {
            setHasError(true);
            setStreet('');
            setNeighborhood('');
            setUf(data.uf);;
            setCity('');
          } else {
            setHasError(false);
            setStreet(data.logradouro);
            setNeighborhood(data.bairro);
            setUf(data.uf);
            setCity(data.localidade);
          }
        })
        .catch(() => {
          setHasError(true);
        });
    } else {

      if (cep.length < 8) {
        setHasError(false);
        setStreet('');
        setNeighborhood('');
        setUf('');
        setCity('');
      }
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
          onChange={(e) => setCep(e.target.value)}
          maxLength={8}
        />
        
        <div id="cepError" className={hasError ? '' : 'hidden'}>
          O CEP informado é invalido.
        </div>
        
        <input 
          type="text" 
          id="street" 
          placeholder="Rua" 
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          disabled={!!street}
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
          onChange={(e) => setNeighborhood(e.target.value)}
          disabled={!!neighborhood}
        />
        
        <input 
          type="text" 
          id="uf" 
          placeholder="Estado" 
          value={uf}
          onChange={(e) => setUf(e.target.value)}
          disabled={!!uf}
        />
        
        <input 
          type="text" 
          id="city" 
          placeholder="Cidade" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!!city}
        />
        
        <input type="submit" value="Cadastrar" />
      </form>
    </main>
  );
}
