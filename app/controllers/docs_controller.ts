import type { HttpContext } from '@adonisjs/core/http'
import { apiDocs, type RouteDoc } from '#docs/api_docs'

const METHOD_COLORS: Record<RouteDoc['method'], string> = {
  GET: '#2563eb',
  POST: '#16a34a',
  PUT: '#d97706',
  DELETE: '#dc2626',
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderParams(title: string, params?: RouteDoc['requestBody']) {
  if (!params || params.length === 0) return ''
  const rows = params
    .map(
      (param) => `
        <tr>
          <td><code>${escapeHtml(param.field)}</code></td>
          <td><code>${escapeHtml(param.type)}</code></td>
          <td>${param.required ? 'yes' : 'no'}</td>
          <td>${param.notes ? escapeHtml(param.notes) : ''}</td>
        </tr>`
    )
    .join('')

  return `
    <h4>${title}</h4>
    <table>
      <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Notes</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`
}

function renderResponses(responses: RouteDoc['responses']) {
  return responses
    .map((response) => {
      const body =
        response.body !== undefined
          ? `<pre>${escapeHtml(JSON.stringify(response.body, null, 2))}</pre>`
          : '<p><em>Empty body</em></p>'
      return `
        <div class="response">
          <span class="status status-${Math.floor(response.status / 100)}xx">${response.status}</span>
          <span class="response-description">${escapeHtml(response.description)}</span>
          ${body}
        </div>`
    })
    .join('')
}

function renderRoute(route: RouteDoc) {
  return `
    <details class="route">
      <summary>
        <span class="method" style="background:${METHOD_COLORS[route.method]}">${route.method}</span>
        <code class="path">${escapeHtml(route.path)}</code>
        ${route.auth ? '<span class="auth-badge">🔒 auth</span>' : ''}
        <span class="summary-text">${escapeHtml(route.summary)}</span>
      </summary>
      <div class="route-body">
        ${renderParams('Query params', route.queryParams)}
        ${renderParams('Request body', route.requestBody)}
        <h4>Responses</h4>
        ${renderResponses(route.responses)}
      </div>
    </details>`
}

function renderPage() {
  const tags = [...new Set(apiDocs.map((route) => route.tag))]

  const sections = tags
    .map((tag) => {
      const routes = apiDocs.filter((route) => route.tag === tag)
      return `
        <section>
          <h2>${escapeHtml(tag)}</h2>
          ${routes.map(renderRoute).join('')}
        </section>`
    })
    .join('')

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Film{IN}hos API Docs</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, sans-serif; max-width: 960px; margin: 0 auto; padding: 2rem 1rem 4rem; line-height: 1.5; }
  h1 { margin-bottom: 0.25rem; }
  .subtitle { color: #6b7280; margin-top: 0; }
  nav { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1.5rem 0; }
  nav a { text-decoration: none; padding: 0.25rem 0.75rem; border: 1px solid #d1d5db; border-radius: 999px; color: inherit; }
  section { margin-bottom: 2rem; }
  details.route { border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 0.5rem; padding: 0.5rem 0.75rem; }
  details.route summary { cursor: pointer; display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; list-style: none; }
  details.route summary::-webkit-details-marker { display: none; }
  .method { color: white; font-weight: 700; font-size: 0.75rem; padding: 0.15rem 0.5rem; border-radius: 4px; min-width: 3.5rem; text-align: center; }
  .path { font-size: 0.95rem; }
  .auth-badge { font-size: 0.75rem; color: #92400e; background: #fef3c7; padding: 0.1rem 0.5rem; border-radius: 999px; }
  .summary-text { color: #6b7280; font-size: 0.9rem; }
  .route-body { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #e5e7eb; }
  table { border-collapse: collapse; width: 100%; margin: 0.5rem 0 1rem; font-size: 0.85rem; }
  th, td { text-align: left; padding: 0.3rem 0.5rem; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  .response { margin-bottom: 0.75rem; }
  .status { font-weight: 700; font-size: 0.8rem; padding: 0.1rem 0.4rem; border-radius: 4px; margin-right: 0.5rem; }
  .status-2xx { background: #dcfce7; color: #166534; }
  .status-4xx { background: #fee2e2; color: #991b1b; }
  .response-description { font-size: 0.85rem; color: #6b7280; }
  pre { background: #111827; color: #e5e7eb; padding: 0.75rem; border-radius: 6px; overflow-x: auto; font-size: 0.8rem; }
  code { font-family: ui-monospace, monospace; }
</style>
</head>
<body>
  <h1>Film{IN}hos API</h1>
  <p class="subtitle">Base URL <code>/api/v1</code>. Success responses are wrapped as <code>{ "data": ... }</code>; paginated lists also include a sibling <code>metadata</code> object. 🔒 routes require <code>Authorization: Bearer &lt;token&gt;</code>.</p>
  <nav>${tags.map((tag) => `<a href="#${escapeHtml(tag)}">${escapeHtml(tag)}</a>`).join('')}</nav>
  ${tags.map((tag) => `<a id="${escapeHtml(tag)}"></a>`).join('')}
  ${sections}
  <p><a href="/docs.json">View raw JSON spec →</a></p>
</body>
</html>`
}

export default class DocsController {
  async show({ response }: HttpContext) {
    response.type('text/html')
    return renderPage()
  }

  async json() {
    return apiDocs
  }
}
