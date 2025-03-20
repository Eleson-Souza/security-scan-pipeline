# 🔍 Security Scan Pipeline

## 🚀 Objetivo

Este repositório tem como finalidade realizar **análises automáticas de segurança** durante o fluxo de CI/CD, garantindo a identificação de vulnerabilidades antes da implantação.

Os scans são executados automaticamente em branches específicas e na `main`, garantindo a conformidade com padrões de segurança.

## 🛠️ Tecnologias Utilizadas

- **Bitbucket Pipelines** → Para automação do CI/CD.
- **Veracode** → Ferramenta de análise estática de código (SAST).
- **Wiz** → Plataforma de segurança em nuvem para análise de infraestrutura como código (IaC).

## 📜 Estrutura do Repositório

📂 src/ # Código-fonte da aplicação<br>
📜 bitbucket-pipelines.yml # Configuração do pipeline de segurança<br>
📜 README.md # Documentação do projeto<br>

## ⚙️ Configuração do Bitbucket Pipelines

O pipeline está configurado para rodar automaticamente **duas etapas principais** de segurança:

1. **Veracode Scan** - Realiza análise estática do código.
2. **Wiz Scan** - Verifica a segurança da infraestrutura como código (IaC).

O **arquivo `bitbucket-pipelines.yml`** define como essas etapas são executadas.

---

## 🛡️ Como Rodar os Scans Manualmente

Se desejar executar os scans localmente sem o pipeline, use os seguintes comandos:

### 🔹 **Executando Veracode Manualmente**

```sh
apk add zip curl
curl -fsS https://tools.veracode.com/veracode-cli/install | sh
zip -r app.zip ./
./veracode static scan app.zip --results-file scan-results.json
```

### 🔹 **Executando Wiz Manualmente**

```sh
apk add curl jq
pip install awscli
curl -o wizcli https://downloads.wiz.io/wizcli/latest/wizcli-linux-amd64 && chmod +x wizcli
export WIZ_CREDENTIALS=$(aws secretsmanager get-secret-value --secret-id $ENV/credentials/wiz --output text --query "SecretString")
./wizcli auth --id "$(echo $WIZ_CREDENTIALS | jq -r .client_id)" --secret "$(echo $WIZ_CREDENTIALS | jq -r .client_secret)"
./wizcli iac scan --path . --name "repo-name" --format json --output wiz_iac_scan_results.json
./wizcli dir scan --path . --name "repo-name" --format json --output wiz_dir_scan_results.json
```

---

## 📊 Exemplos de Outputs dos Scans

### **📌 Output do Veracode**

```sh
+ ./veracode static scan app.zip --results-file scan-results.json
----------------------------------------------------------------
Veracode Static Analysis Scan
8:34PM INF Creating scan
SCAN_ID: c86357f9-1818-44fa-b718-f9bb2c59bbf0
SCAN_STATUS: SUCCESS
SCAN_MESSAGE: Scan successful. Results size: 19641 bytes
Found 2 scannable modules: [JS files within app.zip Python files within app.zip]
Analyzed 2 scannable modules: [JS files within app.zip Python files within app.zip]
Found 5 issues total
Found 5 issues of MEDIUM severity
CWE-80: Improper Neutralization of Script-Related HTML Tags in a Web Page (Basic XSS): src/components/XXSVulnerableComponent.tsx:14
CWE-117: Improper Output Neutralization for Logs: src/components/SQLInjectionVulnerableComponent.tsx:9
CWE-798: Use of Hard-coded Credentials: src/components/HardCodedCredentialComponent.tsx:6
8:35PM INF Saved all results all_results=/opt/atlassian/pipelines/agent/build/scan-results.json
8:35PM ERR Static analysis failure error="found flaws that match chosen criteria"
```

---

### **📌 Output do Wiz**

```sh
           _            _ _
 __      _(_)____   ___| (_)
 \ \ /\ / / |_  /  / __| | |
  \ V  V /| |/ /  | (__| | |
   \_/\_/ |_/___|  \___|_|_|
Already authenticated.
SUCCESS  IAC scan analysis ready
Evaluated policies:
    Name: Default IaC policy
    Type: IAC
    Action: AUDIT
    Name: Default secrets policy
    Type: SECRETS
    Action: AUDIT
Files scanned: 0, Rules evaluated: 0, Rules with failures: 0
Scan results: PASSED. Scanned files meet policy requirements

Library vulnerabilities:
    Name: lodash, Version: 4.17.19, Path: /package.json
        CVE-2021-23337, Severity: HIGH, Source: https://github.com/advisories/GHSA-35jh-r3h4-6jhm
            🩹 Fixed version: 4.17.21
    Name: github.com/containerd/containerd, Version: 1.7.23, Path: /wizcli
        CVE-2024-40635, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-265r-hfxg-fhmg
            🩹 Fixed version: 1.7.27
    Name: @babel/helpers, Version: 7.26.9, Path: /yarn.lock
        CVE-2025-27789, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-968p-4wvh-cqc8
            🩹 Fixed version: 7.26.10
Scan results: PASSED. Directory meets policy requirements

           _            _ _
 __      _(_)____   ___| (_)
 \ \ /\ / / |_  /  / __| | |
  \ V  V /| |/ /  | (__| | |
   \_/\_/ |_/___|  \___|_|_|
 SUCCESS  Ready to scan directory /app
 SUCCESS  Scanned directory
 WARNING  A malware policy was provided but the --file-hashes-scan flag was not set, malwares can't be detected without it
 SUCCESS  Directory scan analysis readyLibrary vulnerabilities:
    Name: lodash, Version: 4.17.19, Path: /package.json
        CVE-2021-23337, Severity: HIGH, Source: https://github.com/advisories/GHSA-35jh-r3h4-6jhm
            CVSS score: 7.2, CVSS exploitability score: 1.2
            🩹 Fixed version: 4.17.21
        CVE-2020-28500, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-29mw-wpgm-hmr9
            CVSS score: 5.3, CVSS exploitability score: 3.9
            🩹 Fixed version: 4.17.21
    Name: github.com/containerd/containerd, Version: 1.7.23, Path: /wizcli
        CVE-2024-40635, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-265r-hfxg-fhmg
            🩹 Fixed version: 1.7.27
    Name: golang.org/x/crypto, Version: 0.32.0, Path: /wizcli
        CVE-2025-22869, Severity: HIGH, Source: https://pkg.go.dev/vuln/GO-2025-3487
            🩹 Fixed version: 0.35.0
    Name: golang.org/x/net, Version: 0.34.0, Path: /wizcli
        CVE-2025-22870, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-qxp5-gwg8-xv66
            🩹 Fixed version: 0.36.0
    Name: @babel/helpers, Version: 7.26.9, Path: /yarn.lock
        CVE-2025-27789, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-968p-4wvh-cqc8
            🩹 Fixed version: 7.26.10
    Name: lodash, Version: 4.17.19, Path: /yarn.lock
        CVE-2021-23337, Severity: HIGH, Source: https://github.com/advisories/GHSA-35jh-r3h4-6jhm
            CVSS score: 7.2, CVSS exploitability score: 1.2
            🩹 Fixed version: 4.17.21
        CVE-2020-28500, Severity: MEDIUM, Source: https://github.com/advisories/GHSA-29mw-wpgm-hmr9
            CVSS score: 5.3, CVSS exploitability score: 3.9
            🩹 Fixed version: 4.17.21

Evaluated policies:
    Name: Default malware policy
    Type: MALWARE
    Action: AUDIT
    Name: Default secrets policy
    Type: SECRETS
    Action: AUDIT
    Name: Default sensitive data policy
    Type: SENSITIVE_DATA
    Action: AUDIT
    Name: Default vulnerabilities policy
    Type: VULNERABILITIES
    Action: BLOCK
Vulnerable packages: CRITICAL: 0, HIGH: 3, MEDIUM: 3, LOW: 0, INFORMATIONAL: 0
    Total: 6
Vulnerabilities: CRITICAL: 0, HIGH: 3, MEDIUM: 5, LOW: 0, INFORMATIONAL: 0
    Total: 8, out of which 8 are fixable
Directories scanned: 731, Files scanned: 6721
Scan results: PASSED. Directory meets policy requirements
```

---

## 📊 Relatórios Gerados

Os resultados dos scans são armazenados nos arquivos JSON gerados como **artefatos** do pipeline:

- `scan-results.json` → Relatório da análise do Veracode.
- `wiz_iac_scan_results.json` → Relatório de segurança em infraestrutura do Wiz.
- `wiz_dir_scan_results.json` → Relatório de varredura de diretório do Wiz.

Estes arquivos podem ser baixados e analisados manualmente.
