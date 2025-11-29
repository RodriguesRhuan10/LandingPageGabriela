@echo off
echo ========================================
echo Configurando Git para Landing Page
echo ========================================
echo.

cd /d "c:\Users\RHUAN\Documents\Projects\LandingPage"

echo [1/6] Inicializando repositorio Git...
git init
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel inicializar o Git
    pause
    exit /b 1
)
echo OK - Repositorio inicializado
echo.

echo [2/6] Configurando remote do GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/RodriguesRhuan10/LandingPageGabriela.git
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel configurar remote
    pause
    exit /b 1
)
echo OK - Remote configurado
echo.

echo [3/6] Adicionando arquivos...
git add .
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel adicionar arquivos
    pause
    exit /b 1
)
echo OK - Arquivos adicionados
echo.

echo [4/6] Criando commit...
git commit -m "Initial commit: Landing Page Despertar das Cores"
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel criar commit
    pause
    exit /b 1
)
echo OK - Commit criado
echo.

echo [5/6] Configurando branch main...
git branch -M main
if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel configurar branch
    pause
    exit /b 1
)
echo OK - Branch main configurada
echo.

echo [6/6] Verificando configuracao...
git remote -v
echo.
git status
echo.

echo ========================================
echo CONFIGURACAO CONCLUIDA!
echo ========================================
echo.
echo Agora execute no terminal:
echo   git push -u origin main
echo.
echo Se pedir autenticacao, use um Personal Access Token
echo.
pause
