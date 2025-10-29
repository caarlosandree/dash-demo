#!/bin/bash

# Script para criar release no GitHub via API
# Requer um token de acesso pessoal do GitHub (GITHUB_TOKEN)

REPO="caarlosandree/dash-demo"
TAG="v1.0.0"
RELEASE_NOTES=$(cat RELEASE_NOTES.md)

# Verifica se o token está definido
if [ -z "$GITHUB_TOKEN" ]; then
    echo "⚠️  GITHUB_TOKEN não está definido!"
    echo "Por favor, defina seu token:"
    echo "export GITHUB_TOKEN=seu_token_aqui"
    echo ""
    echo "Para obter um token:"
    echo "1. Vá em: https://github.com/settings/tokens"
    echo "2. Gere um novo token com permissão 'repo'"
    exit 1
fi

# Cria a release
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO/releases \
  -d "{
    \"tag_name\": \"$TAG\",
    \"name\": \"Release $TAG - Dashboard de Gráficos\",
    \"body\": $(echo "$RELEASE_NOTES" | jq -Rs .),
    \"draft\": false,
    \"prerelease\": false
  }"

echo ""
echo "✅ Release criada com sucesso!"

