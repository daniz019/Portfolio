import { NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!

export async function POST(req: Request) {
  try {
    console.log('Recebendo requisição de contato...')
    const body = await req.json()
    const { name, email, subject, message } = body
    
    console.log('Dados recebidos:', { name, email, subject, message })

    if (!DISCORD_WEBHOOK_URL) {
      console.error('Discord webhook URL não configurada!')
      return NextResponse.json(
        { error: "Discord webhook URL not configured" },
        { status: 500 }
      )
    }

    console.log('Webhook URL configurada:', DISCORD_WEBHOOK_URL.substring(0, 30) + '...')

    // Criar uma mensagem formatada para o Discord com design melhorado
    const discordMessage = {
      embeds: [{
        title: "📬 Nova Mensagem de Contato",
        description: "Uma nova mensagem foi recebida através do formulário de contato do portfólio.",
        color: 0x2ecc71, // Verde esmeralda
        thumbnail: {
          url: "https://i.imgur.com/bQjKaGm.png" // Ícone de mensagem
        },
        fields: [
          {
            name: "👤 Nome",
            value: `\`${name}\``,
            inline: true
          },
          {
            name: "📧 Email",
            value: `\`${email}\``,
            inline: true
          },
          {
            name: "\u200B",
            value: "\u200B",
            inline: true
          },
          {
            name: "📝 Assunto",
            value: `\`\`\`${subject}\`\`\``,
            inline: false
          },
          {
            name: "💬 Mensagem",
            value: `\`\`\`${message}\`\`\``,
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Portfolio - Sistema de Contato",
          icon_url: "https://i.imgur.com/vNzkqS7.png" // Ícone do portfólio
        },
        author: {
          name: "Sistema de Notificações",
          icon_url: "https://i.imgur.com/JUSWMDZ.png" // Ícone de notificação
        }
      }]
    }

    console.log('Enviando mensagem para o Discord...')
    
    // Enviar para o Discord
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    })

    console.log('Resposta do Discord:', response.status, response.statusText)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erro do Discord:', errorText)
      throw new Error(`Failed to send message to Discord: ${errorText}`)
    }

    console.log('Mensagem enviada com sucesso!')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro detalhado:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send message" },
      { status: 500 }
    )
  }
} 