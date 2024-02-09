import './App.css';
import {useState, useEffect} from "react";
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  const { data : items } = useFetch(url);
  //console.log(data);

  const [name, setName] = useState("");
  const [gorduras_totais, setGordura] = useState("");
  const [carboidratos, setCarboidrato] = useState("");
  const [proteinas, setProteinas] = useState("");
  const [price, setPrice] = useState("");
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
    e.preventDefault()
    const product = { name, gorduras_totais, carboidratos, proteinas, price, };

    const res = await fetch(url,{
      method: "POST",
      headers: { "Content-Type":"application/json",},
      body: JSON.stringify(product),
    })
    const addedProducts = await res.json();
    setProducts( (prevProducts) => [...prevProducts, addedProducts]);
    setName(""); setGordura(""); setCarboidrato(""); setProteinas(""); setPrice("");
  };

  return (
    <div className="App">
      <h1>Adicionar Item</h1>

      <div className='add-product'>

        <form onSubmit={handleSubmit}>

        <label>
            Nome do Produto: <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Gordura: <input type="number" name="gorduras_totais" value={gorduras_totais} onChange={(e) => setGordura(e.target.value)} />
          </label>
          <label>
            Carboidrato: <input type="number" name="carboidratos" value={carboidratos} onChange={(e) => setCarboidrato(e.target.value)} />
          </label>
          <label>
            Proteína: <input type="number" name="proteinas" value={proteinas} onChange={(e) => setProteinas(e.target.value)} />
          </label>
          <label>
            Preço: <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <input type="submit" value="Criar" />

        </form>

      </div>

      <h2>Lista de Receitas</h2>
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
                </ul>
              </li>
            )
          ) 
        }
      </ul>
    </div> 
  );
}

export default App;
