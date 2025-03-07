package de.philgenstock.choremaster

import org.springframework.boot.fromApplication
import org.springframework.boot.with


fun main(args: Array<String>) {
	fromApplication<ChoremasterApplication>().with(TestcontainersConfiguration::class).run(*args)
}
