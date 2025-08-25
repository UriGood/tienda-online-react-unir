 import { useEffect, useState } from 'react'

export function useProducts(apiUrl = 'https://dummyjson.com/products') {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        if (!response.ok) throw new Error('Error al cargar productos')
          const data = await response.json();
        
        if ("products" in data) {
          setProducts(data.products)
        }else{
          setProducts(data)
        }
        
      } catch (err) {
        setError(err.message || 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [apiUrl])

  return { products, loading, error }
}