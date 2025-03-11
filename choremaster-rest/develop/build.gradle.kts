plugins {
    kotlin("jvm") version "1.9.25"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(project(":rest"))
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.8.5")
}
