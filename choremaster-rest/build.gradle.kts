plugins {
	id("org.jetbrains.kotlin.jvm") version "1.9.25"
	id("org.jetbrains.kotlin.plugin.spring") version "1.9.25" apply false
	id("org.springframework.boot") version "3.4.3" apply false
	id("io.spring.dependency-management") version "1.1.7" apply false
	id("org.jetbrains.kotlin.plugin.jpa") version "1.9.25" apply false
	id("org.jetbrains.kotlin.plugin.allopen") version "1.9.22"
}

group = "de.philgenstock"
version = "0.0.1-SNAPSHOT"

repositories {
	mavenCentral()
}

allprojects{

}

subprojects{

	apply(plugin = "io.spring.dependency-management")
	apply(plugin = "org.springframework.boot")
	apply(plugin = "org.jetbrains.kotlin.plugin.spring")
	apply(plugin = "org.jetbrains.kotlin.jvm")
	apply(plugin = "org.jetbrains.kotlin.plugin.jpa")
	apply(plugin = "org.jetbrains.kotlin.plugin.allopen")

	allOpen {
		annotation("jakarta.persistence.Entity")
		annotation("jakarta.persistence.MappedSuperclass")
		annotation("jakarta.persistence.Embeddable")
	}

	tasks.withType<Test> {
		useJUnitPlatform()
	}

	kotlin{
		compilerOptions {
			freeCompilerArgs.addAll("-Xjsr305=strict")
		}
	}

	java {
		toolchain {
			languageVersion = JavaLanguageVersion.of(21)
		}
	}


}


