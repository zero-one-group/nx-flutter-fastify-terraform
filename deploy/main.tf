// Configure the Google Cloud provider
provider "google" {
 credentials = file("CREDENTIALS_FILE.json")
 project     = "NAME_OF_PROJECT"
 region      = "ASIA_SOUTHEAST_@"
}
