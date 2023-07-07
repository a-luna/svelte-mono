variable "GITHUB_SHA" {
  default = "latest"
}

variable "API_KEY" {
  default = ""
}

variable "WAKATIME_API_KEY" {
  default = ""
}

target "portfolio" {
    dockerfile = "./apps/portfolio/Dockerfile"
    contexts = {
        project = "./apps/portfolio"
        root = "."
    }
    tags = ["ghcr.io/a-luna/portfolio:${GITHUB_SHA}"]
    args = {
        API_KEY = "${API_KEY}"
        WAKATIME_API_KEY = "${WAKATIME_API_KEY}"
    }
}