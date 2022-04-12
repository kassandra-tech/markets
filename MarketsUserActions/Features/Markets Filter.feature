@Markets
Feature: Markets Filter

@Layout
Scenario: Markets filter layout
	Given the user navigates to the "Markets" screen
	Then the "Markets" filter is visible
	And the "Markets" filter contains "All Markets"
	And the "Markets" filter contains "Favorites"
	And the "Markets" filter contains "BTC"
	And the "Markets" filter contains "USD"
	And the "Markets" filter contains "USDT"
	And the "Markets" filter contains "ETH"
	And the "Markets" filter contains "BNB"

Scenario: View all markets
	Given the user navigates to the "Markets" screen
	When the "All Markets" filter is clicked
	Then "All" markets are visible

Scenario: View favorite markets
	Given the user navigates to the "Markets" screen
	When the "Favorites" filter is clicked
	Then only "Favorite" markets are visible

Scenario: View BTC markets
	Given the user navigates to the "Markets" screen
	When the "BTC" filter is clicked
	Then only "BTC" markets are visible

Scenario: View USD markets
	Given the user navigates to the "Markets" screen
	When the "USD" filter is clicked
	Then only "USD" markets are visible

Scenario: View USDT markets
	Given the user navigates to the "Markets" screen
	When the "USDT" filter is clicked
	Then only "USDT" markets are visible

Scenario: View ETH markets
	Given the user navigates to the "Markets" screen
	When the "ETH" filter is clicked
	Then only "ETH" markets are visible

Scenario: View BNB markets
	Given the user navigates to the "Markets" screen
	When the "BNB" filter is clicked
	Then only "BNB" markets are visible
