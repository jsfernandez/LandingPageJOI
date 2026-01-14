# eJoi V6 - Plataforma de Acompañamiento Personal con IA

Plataforma de acompañamiento personal con IA diseñada como una relación continua, no como un chatbot utilitario. La experiencia se construye alrededor de una "compañera" virtual con presencia visual y memoria relacional.

## Características del MVP

- Conversación texto bidireccional
- Entrada por voz opcional (dictado → texto)
- Sistema de memoria persistente (factual, episódica, contextual)
- Avatar persistente (estilo realista o anime)
- Arquitectura preparada para tienda de accesorios (deshabilitada en MVP)
- Landing page con preregistro

## Tecnologías

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React 18

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar servidor de producción
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Estructura del Proyecto

```
├── app/
│   ├── components/     # Componentes React
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página principal (landing)
│   └── globals.css    # Estilos globales
├── public/
│   ├── arquetipos/    # Imágenes de arquetipos
│   └── anime/         # Imágenes estilo anime
└── ...
```

## Licencia

Privado - Todos los derechos reservados

