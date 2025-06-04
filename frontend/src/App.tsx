import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClients, createClient, deleteClient, updateClient } from './api';
import { AssetList } from './AssetList';
import { AssetsReadOnly } from './AssetsReadOnly';

export default function App() {
  const queryClient = useQueryClient();
  const [showAssets, setShowAssets] = useState(false);

  // React Query para clientes
  const { data: clients = [], isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => updateClient(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['clients'] }),
  });

  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('ativo');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    createMutation.mutate({ name, email, status });
    setName('');
    setEmail('');
    setStatus('ativo');
  }

  function handleDeleteClient(id: number) {
    if (!window.confirm('Confirma exclusão do cliente?')) return;
    deleteMutation.mutate(id);
  }

  function handleToggleStatus(client: any) {
    const newStatus = client.status === 'ativo' ? 'inativo' : 'ativo';
    updateMutation.mutate({ id: client.id, data: { ...client, status: newStatus } });
  }

  // Alterna para a tela de ativos
  if (showAssets) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={() => setShowAssets(false)} style={{ marginBottom: 24 }}>
          Voltar para Clientes
        </button>
        <AssetsReadOnly />
      </div>
    );
  }

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar clientes.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto' }}>
      <button onClick={() => setShowAssets(true)} style={{ marginBottom: 16 }}>
        Ver Ativos (somente leitura)
      </button>
      <h2>Cadastro de Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      <h3>Lista de Clientes</h3>
      <ul>
        {clients.length === 0 && <li>Nenhum cliente cadastrado ainda.</li>}
        {clients.map((c: any) => (
          <li key={c.id} style={{ marginBottom: 20 }}>
            <b>{c.name}</b> - {c.email} [{c.status}]
            <button onClick={() => handleToggleStatus(c)} style={{ marginLeft: 8 }}>
              {c.status === 'ativo' ? 'Desativar' : 'Ativar'}
            </button>
            <button onClick={() => handleDeleteClient(c.id)} style={{ marginLeft: 8, color: 'red' }}>
              Excluir Cliente
            </button>
            <AssetList clientId={c.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
