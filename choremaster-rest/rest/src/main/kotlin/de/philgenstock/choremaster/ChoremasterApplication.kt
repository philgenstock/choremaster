package de.philgenstock.choremaster

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ChoremasterApplication

fun main(args: Array<String>) {
	runApplication<ChoremasterApplication>(*args)
}
