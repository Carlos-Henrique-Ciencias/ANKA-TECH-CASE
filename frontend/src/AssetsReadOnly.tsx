import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function AssetsReadOnly() {
  // Busca os ativos diretamente do backend
  const { data: assets = [], isLoading, isError } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3001/assets');
      return res.data;
    },
  });

  if (isLoading) return <div>Carregando ativos...</div>;
  if (isError) return <div>Erro ao carregar ativos.</div>;

  return (
    <div style={{
      maxWidth: 400,
      margin: "2rem auto",
      background: "#f8fafc",
      borderRadius: "10px",
      padding: 24,
      boxShadow: "0 4px 16px #0001"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 16 }}>Ativos Financeiros</h2>
      <ul>
        {assets.map((a: any, i: number) => (
          <li key={i} style={{ marginBottom: 12, fontSize: 18 }}>
            <b>{a.name}</b> - R$ {a.value}
          </li>
        ))}
        {assets.length === 0 && <li>Nenhum ativo cadastrado.</li>}
      </ul>
    </div>
  );
}
