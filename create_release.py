#!/usr/bin/env python3
"""
Script para criar release no GitHub via API
Uso: python create_release.py [GITHUB_TOKEN]
"""

import sys
import json
import os
import urllib.request
import urllib.parse

REPO = "caarlosandree/dash-demo"
TAG = "v1.0.0"

def get_release_body():
    """Lê o conteúdo do arquivo RELEASE_BODY.md"""
    try:
        with open("RELEASE_BODY.md", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print("❌ Arquivo RELEASE_BODY.md não encontrado!")
        sys.exit(1)

def create_release(token, body):
    """Cria a release no GitHub"""
    url = f"https://api.github.com/repos/{REPO}/releases"
    
    data = {
        "tag_name": TAG,
        "name": f"Release {TAG} - Dashboard de Gráficos",
        "body": body,
        "draft": False,
        "prerelease": False
    }
    
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"✅ Release criada com sucesso!")
            print(f"🔗 URL: {result.get('html_url', 'N/A')}")
            return result
    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        print(f"❌ Erro ao criar release: {e.code}")
        print(f"Resposta: {error_body}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)

def main():
    # Tenta obter o token do argumento, variável de ambiente ou solicita
    token = None
    if len(sys.argv) > 1:
        token = sys.argv[1]
    elif os.getenv("GITHUB_TOKEN"):
        token = os.getenv("GITHUB_TOKEN")
    
    if not token:
        print("⚠️  Token do GitHub necessário!")
        print("\nOpções:")
        print("1. Passar como argumento: python create_release.py SEU_TOKEN")
        print("2. Definir variável de ambiente: export GITHUB_TOKEN=seu_token")
        print("\nPara obter um token:")
        print("1. Vá em: https://github.com/settings/tokens")
        print("2. Gere um novo token (classic) com permissão 'repo'")
        sys.exit(1)
    
    body = get_release_body()
    create_release(token, body)

if __name__ == "__main__":
    main()

