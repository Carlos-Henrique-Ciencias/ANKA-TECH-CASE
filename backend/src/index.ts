import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const fastify = Fastify({ logger: true })
const prisma = new PrismaClient()

const clientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.enum(['ativo', 'inativo'])
})

const assetSchema = z.object({
  name: z.string().min(1),
  value: z.coerce.number(),
  clientId: z.number()
})

async function main() {
  // Habilita CORS para qualquer origem (dev)
  await fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })

  // CRUD de Clientes
  fastify.get('/clients', async () => {
    return prisma.client.findMany({ include: { assets: true } })
  })

  fastify.post('/clients', async (req, res) => {
    const result = clientSchema.safeParse(req.body)
    if (!result.success) return res.status(400).send(result.error)
    const { name, email, status } = result.data
    try {
      const client = await prisma.client.create({ data: { name, email, status } })
      return client
    } catch (e) {
      return res.status(400).send({ error: 'E-mail já cadastrado' })
    }
  })

  fastify.put('/clients/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const idNum = Number(id)
    const result = clientSchema.safeParse(req.body)
    if (!result.success) return res.status(400).send(result.error)
    try {
      const client = await prisma.client.update({
        where: { id: idNum },
        data: result.data
      })
      return client
    } catch (e) {
      return res.status(400).send({ error: 'Erro ao atualizar' })
    }
  })

  // Deletar cliente só depois de remover os assets vinculados
  fastify.delete('/clients/:id', async (req, res) => {
    const { id } = req.params as { id: string }
    const idNum = Number(id)
    try {
      await prisma.asset.deleteMany({ where: { clientId: idNum } })
      await prisma.client.delete({
        where: { id: idNum }
      })
      return { success: true }
    } catch (e) {
      return res.status(400).send({ error: 'Erro ao deletar cliente' })
    }
  })

  // CRUD de Assets vinculados ao cliente
  // Listar assets de um cliente
  fastify.get('/clients/:clientId/assets', async (req, res) => {
    const clientId = Number((req.params as any).clientId)
    const assets = await prisma.asset.findMany({ where: { clientId } })
    return assets
  })

  // Cadastrar asset para um cliente
  fastify.post('/clients/:clientId/assets', async (req, res) => {
    const clientId = Number((req.params as any).clientId)
    const body = req.body as { name: string; value: number }
    const result = assetSchema.safeParse({ ...body, clientId })
    if (!result.success) return res.status(400).send(result.error)
    const { name, value } = result.data
    try {
      const asset = await prisma.asset.create({ data: { name, value, clientId } })
      return asset
    } catch (e) {
      return res.status(400).send({ error: 'Erro ao criar ativo' })
    }
  })

  // Editar um asset
  fastify.put('/assets/:id', async (req, res) => {
    const id = Number((req.params as any).id)
    const body = req.body as { name: string; value: number; clientId: number }
    const result = assetSchema.safeParse(body)
    if (!result.success) return res.status(400).send(result.error)
    try {
      const asset = await prisma.asset.update({
        where: { id },
        data: result.data
      })
      return asset
    } catch (e) {
      return res.status(400).send({ error: 'Erro ao editar ativo' })
    }
  })

  // Excluir um asset
  fastify.delete('/assets/:id', async (req, res) => {
    const id = Number((req.params as any).id)
    try {
      await prisma.asset.delete({ where: { id } })
      return { success: true }
    } catch (e) {
      return res.status(400).send({ error: 'Erro ao deletar ativo' })
    }
  })

  // 🔷 LISTA DINÂMICA DE ATIVOS (todos os ativos do banco)
  fastify.get('/assets', async () => {
    return prisma.asset.findMany();
  });

  fastify.listen({ port: 3001, host: '0.0.0.0' }, err => {
    if (err) throw err
    console.log('Backend rodando na porta 3001')
  })
}

main()
