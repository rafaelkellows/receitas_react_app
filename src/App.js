import './App.css';
import {useState, useEffect} from "react";
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const { data : items, httpConfig, loading, error, msgReturn, statusReturn } = useFetch(url);
  //console.log(data);

  const [name, setName] = useState("");
  const [gorduras_totais, setGordura] = useState(0);
  const [carboidratos, setCarboidrato] = useState(0);
  const [proteinas, setProteinas] = useState(0);
  const [price, setPrice] = useState(0);
  // 1. Resgatando dados
  /*useEffect( 
    () => {
      async function fetchData(){
        const res = await fetch(url);
        const data = await res.json();
        setProducts(data);
      }
      fetchData();
    },[]);*/
    //console.log(products);
    
  // 2. Adicionando dados
  const handleSubmit = async(e) => {

    e.preventDefault();

    const product = { name, gorduras_totais, carboidratos, proteinas, price, };

    /*const res = await fetch(url,{
      method: "POST",
      headers: { "Content-Type":"application/json",},
      body: JSON.stringify(product),
    });

    const addedProducts = await res.json();
    setProducts( (prevProducts) => [...prevProducts, addedProducts]);*/

    // Refaturando Post
    httpConfig(product,"POST");

    setName(""); 
    setGordura(0); 
    setCarboidrato(0); 
    setProteinas(""); 
    setPrice("");
  };

  // Remove
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };
  


  //Render
  return (
    <div className="App">
      <h1>Adicionar Item</h1>

      <div className='add-product'>
        
        <form onSubmit={handleSubmit}>

        <label> <span>Nome do Produto:</span> <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label>
            <span>Gordura:</span> <input type="number" name="gorduras_totais" value={gorduras_totais} onChange={(e) => setGordura(e.target.value)} />
          </label>
          <label>
          <span>Carboidrato:</span> <input type="number" name="carboidratos" value={carboidratos} onChange={(e) => setCarboidrato(e.target.value)} />
          </label>
          <label>
          <span>Proteína:</span> <input type="number" name="proteinas" value={proteinas} onChange={(e) => setProteinas(e.target.value)} />
          </label>
          <label>
          <span>Preço:</span> <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          {!loading && (
            <input type="submit" value="Adicionar Item"  />
          )}
          {loading && (
            <input type="submit" value="Adicionar Item" disabled />
          )}
        </form>
        
      </div>

      <h2>Lista de Produtos</h2>
      
      {loading && <p>Carregando dados...</p>}
      {msgReturn && !statusReturn &&
        (<p>Item removido com sucesso!</p>)
      }
      {msgReturn && statusReturn &&
        (<p>Item <strong>{msgReturn}</strong> foi adicionando com sucesso!</p>)
      }
      {error && <p>Erro: {error}</p>}

      {!loading &&(
        <ul>
          { 
            items && items.map( 
              (product) => (
                <li key={product.id}>
                  <strong>{product.name}</strong>
                  <ul>
                    <li>Gordura: {product.gorduras_totais}</li>
                    <li>Carboidrato: {product.carboidratos}</li>
                    <li>Proteína: {product.proteinas}</li>
                    <li>Preço: {product.price}</li>
                    <button onClick={()=> handleRemove(product.id)}>Remover Item</button>

                  </ul>
                </li>
              )
            ) 
          }
        </ul>
      )}
    </div> 
  );
}

export default App;
