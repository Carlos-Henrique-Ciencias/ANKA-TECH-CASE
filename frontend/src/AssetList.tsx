import { useEffect, useState } from "react";
import { getAssetsByClient, createAsset, updateAsset, deleteAsset } from "./api";

export function AssetList({ clientId }: { clientId: number }) {
  const [assets, setAssets] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line
  }, [clientId]);

  async function fetchAssets() {
    const data = await getAssetsByClient(clientId);
    setAssets(data);
  }

  async function handleCreate(e: any) {
    e.preventDefault();
    if (!name || !value) return;
    await createAsset(clientId, { name, value: Number(value) });
    setName("");
    setValue("");
    fetchAssets();
  }

  async function handleUpdate(e: any) {
    e.preventDefault();
    if (!editing) return;
    await updateAsset(editing.id, { name, value: Number(value), clientId });
    setEditing(null);
    setName("");
    setValue("");
    fetchAssets();
  }

  function startEdit(asset: any) {
    setEditing(asset);
    setName(asset.name);
    setValue(asset.value);
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Confirma exclusão?")) return;
    await deleteAsset(id);
    fetchAssets();
  }

  return (
    <div className="asset-box">
      <strong>Ativos:</strong>
      <form onSubmit={editing ? handleUpdate : handleCreate} style={{ marginBottom: 10 }}>
        <input
          placeholder="Nome do ativo"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="Valor"
          type="number"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">{editing ? "Salvar" : "Adicionar"}</button>
        {editing && (
          <button type="button" onClick={() => { setEditing(null); setName(""); setValue(""); }}>
            Cancelar
          </button>
        )}
      </form>
      <ul>
        {assets.map(a => (
  <li key={a.id}>
    {a.name} - R$ {a.value}
    <button style={{ marginLeft: 5 }} onClick={() => startEdit(a)}>Editar</button>
    <button style={{ marginLeft: 5, color: "red" }} onClick={() => handleDelete(a.id)}>Excluir</button>
  </li>
))}
        {assets.length === 0 && <li>(Nenhum ativo cadastrado)</li>}
      </ul>
    </div>
  );
}
