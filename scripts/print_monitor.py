import os
import time
import win32print
import win32api

# Caminho da pasta onde os PDFs serão salvos
PASTA_MONITORADA = r"C:\notas_filcar"

# Impressora padrão (ou substitua pelo nome da desejada)
IMPRESSORA = win32print.GetDefaultPrinter()

# Armazena os arquivos já processados
arquivos_processados = set()

def imprimir_pdf(caminho_pdf):
    try:
        print(f"Iniciando impressão do arquivo: {caminho_pdf}")
        win32api.ShellExecute(
            0,
            "print",
            caminho_pdf,
            None,
            ".",
            0
        )
        print(f"Arquivo enviado para impressão com sucesso!")
    except Exception as e:
        print(f"Ocorreu um erro ao tentar imprimir {caminho_pdf}: {e}")

def monitorar_pasta():
    print(f"Iniciando monitoramento da pasta: {PASTA_MONITORADA}")
    print(f"Impressora configurada: {IMPRESSORA}")
    
    # Criar a pasta se não existir
    if not os.path.exists(PASTA_MONITORADA):
        os.makedirs(PASTA_MONITORADA)
        print(f"Pasta {PASTA_MONITORADA} criada com sucesso!")
    
    while True:
        try:
            # Lista todos os arquivos PDF na pasta
            arquivos = [f for f in os.listdir(PASTA_MONITORADA) if f.endswith(".pdf")]
            
            if arquivos:
                print(f"Encontrados {len(arquivos)} arquivo(s) PDF na pasta")
            
            for arquivo in arquivos:
                caminho_completo = os.path.join(PASTA_MONITORADA, arquivo)
                if caminho_completo not in arquivos_processados:
                    print(f"Novo arquivo detectado: {arquivo}")
                    imprimir_pdf(caminho_completo)
                    arquivos_processados.add(caminho_completo)
        except Exception as e:
            print(f"Erro durante o monitoramento: {e}")

        time.sleep(5)  # Aguarda 5 segundos antes da próxima verificação

if __name__ == "__main__":
    print("=== Sistema de Monitoramento de Impressão de PDFs ===")
    print("Pressione Ctrl+C para encerrar o programa")
    try:
        monitorar_pasta()
    except KeyboardInterrupt:
        print("\nPrograma encerrado pelo usuário") 