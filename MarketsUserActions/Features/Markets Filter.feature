@Markets
Feature: Markets Filter

@Layout
Scenario: Markets filter layout
	Given the user navigates to the "Markets" screen
	Then the "Markets Filter" label is displayed
	And the "Markets Filter" contains "All Markets"
	And the "Markets Filter" contains "Favorites"
	And the "Markets Filter" contains "BTC"
	And the "Markets Filter" contains "USD"
	And the "Markets Filter" contains "USDT"
	And the "Markets Filter" contains "ETH"
	And the "Markets Filter" contains "BNB"

Scenario: View all markets
	Given the user navigates to the "Markets" screen
	When the "All Markets" button is clicked
	Then all markets are displayed

Scenario: View favorite markets
	Given the user navigates to the "Markets" screen
	When the "Favorites" button is clicked
	Then only "Favorite" markets are displayed

Scenario: View BTC markets
	Given the user navigates to the "Markets" screen
	When the "BTC" button is clicked
	Then only "BTC" markets are displayed

Scenario: View USD markets
	Given the user navigates to the "Markets" screen
	When the "USD" button is clicked
	Then only "USD" markets are displayed

Scenario: View USDT markets
	Given the user navigates to the "Markets" screen
	When the "USDT" button is clicked
	Then only "USDT" markets are displayed

Scenario: View ETH markets
	Given the user navigates to the "Markets" screen
	When the "ETH" button is clicked
	Then only "ETH" markets are displayed

Scenario: View BNB markets
	Given the user navigates to the "Markets" screen
	When the "BNB" button is clicked
	Then only "BNB" markets are displayed
