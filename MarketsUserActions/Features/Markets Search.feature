@Markets
Feature: Markets Search

Scenario Outline: Search markets screen for currency
	Given the user navigates to the "Markets" screen
	And the local search is selected
	When <searchTerm> is entered into the search field
	Then <expectedMarket> markets are visible

Examples:
| searchTerm | expectedMarket |
| "Bitcoin"  | "BTC"          |
| "eth"      | "ETH"          |

Scenario Outline: Search markets screen for market
	Given the user navigates to the "Markets" screen
	And the local search is selected
	When <searchTerm> is entered into the search field
	Then "BTC-USD" markets are visible

Examples:
| searchTerm |
| "BTC-USD"  |
| "BTC/USD"  |
| "BTC USD"  |

Scenario: Search multiple markets
	Given the user navigates to the "Markets" screen
	When "BTC, USD" is entered into the search field
	Then "BTC" markets are visible
	Then "USD" markets are visible
