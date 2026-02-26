# 🏰 Palisade

**Enterprise-grade ML model security scanner.** Detects backdoors, supply chain attacks, and malicious payloads before they hit production.

Powered by a **high-performance Rust core**, Palisade delivers maximum speed and memory efficiency, enabling it to scan 70B+ parameter models on standard hardware.

## ⭐ Key Capabilities

- **Blocks Pickle RCE** - Completely prevents remote code execution via pickle files.
- **Validates Model Integrity** - Verifies SafeTensors and GGUF formats against tampering.
- **Verifies Supply Chain** - Enforces **Sigstore** signatures, **SLSA** provenance, and generates **ML-BOMs**.
- **Catches Injection Attacks** - Prevents tokenizer hijacking, config manipulation, and metadata exploits.
- **Zero-Trust Architecture** - Treats all models as potentially malicious until verified.

**15 Security Validators** provide multi-layered defense in depth (10 universal + 5 format-specific).

## Commands

| Command | Description |
|--------|-------------|
| `scan` | Scan model file(s) or directory for security threats (static analysis). |
| `verify-sigstore` | Verify Sigstore model transparency signature. |
| `verify-slsa` | Verify SLSA provenance attestation. |
| `track-provenance` | Generate comprehensive provenance tracking report. |
| `policy` | Policy template management. |

## Using Palisade in Azure DevOps

Palisade for Azure DevOps enables you to integrate Palisade security scanning directly into your CI/CD pipelines.. It installs Palisade from PyPI inside a Docker container and runs the selected Palisade command on your repository, models, or artifacts.

```yaml
trigger:
- main

pool:
  vmImage: ubuntu-latest

steps:
- checkout: self

# Run Palisade Security Scan
- task: Palisade@1
  inputs:
    args: 'scan . --format sarif --output $(Build.SourcesDirectory)/palisade.sarif'
  displayName: Run Palisade Security Scan

# Publish SARIF Report as Pipeline Artifact
- task: PublishPipelineArtifact@1
  inputs:
    targetPath: '$(Build.SourcesDirectory)/palisade.sarif'
    artifact: 'Palisade-SARIF-Report'
    publishLocation: 'pipeline'
  displayName: Publish SARIF Report
```
*Any Palisade command can be executed by passing the appropriate value to the args input.*

## Performance

Palisade uses a native Rust core to handle massive models efficiently without OOM errors. It employs smart streaming and memory mapping to validate models larger than available RAM.

| Model Size | Format | Scan Time | Memory Usage | Validators |
|-----------|--------|-----------|--------------|------------|
| 511.38 MB (250M) | SafeTensors | 3.7 s | 115.4 MB | 13 |
| 2.09 GB | SafeTensors | 14.3 s | 115.4 MB | 13 |
| 3.8 GB (7B Q4_K_M) | GGUF | 29.4 s | 140 MB | 11 |
| 9.4 GB | SafeTensors | 74.3 s | 119.4 MB | 13 |

## Palisade Ecosystem

- 🏆 **Palisade Leaderboard**  
  Explore real-world scan performance, validator coverage, and benchmark results.  
  👉 [SafeLLM-leaderboard](https://huggingface.co/spaces/highflame/SafeLLM-leaderboard)

- 📘 **Palisade Documentation**  
  Learn about validators, supported formats, CLI usage, and security guarantees.  
  👉 [Highflame docs](https://docs.highflame.ai/documentation/red-teaming/model-supply-chain-scan)

**🏰 Built with ❤️ by [highflame](https://www.highflame.com) • Securing the LLM supply chain**
