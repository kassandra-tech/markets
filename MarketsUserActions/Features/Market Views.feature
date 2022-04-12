@Markets
Feature: Market Views

Scenario Outline: Update market view timeframe
	Given the user navigates to the "Markets" screen
	When  the "Timeframe" dropdown is clicked
	And the <time> button is clicked
	Then the data range is <time>

Examples:
| time           |
| "30 m"         |
| "1 H"          |
| "4 H"          |
| "8 H"          |
| "12 H"         |
| "Week"         |
| "Quarter"      |
| "Year"         |
| "Year to date" |

Scenario: Sort markets in ascending order
	Given the user navigates to the "Markets" screen
	When the "Market Header" button is clicked
	Then the "Makret Ascending" icon is highlighted
	And the markets are sorted in ascending order

Scenario: Sort markets in decending order
	Given the user navigates to the "Markets" screen
	When the "Market Header" button is clicked
	And the "Market Header" button is clicked
	Then the "Makret Decending" icon is highlighted
	And the markets are sorted in decending order

Scenario: Sort rank in ascending order
	Given the user navigates to the "Markets" screen
	When the "Rank Header" button is clicked
	Then the "Rank Ascending" icon is highlighted
	And the rank is sorted in ascending order

Scenario: Sort rank in decending order
	Given the user navigates to the "Markets" screen
	When the "Rank Header" button is clicked
	And the "Rank Header" button is clicked
	Then the "Rank Decending" icon is highlighted
	And the rank is sorted in decending order

Scenario: Sort rating in ascending order
	Given the user navigates to the "Markets" screen
	When the "Rating Header" button is clicked
	Then the "Rating Ascending" icon is highlighted
	And the rating is sorted in ascending order

Scenario: Sort rating in decending order
	Given the user navigates to the "Markets" screen
	When the "Rating Header" button is clicked
	And the "Rating Header" button is clicked
	Then the "Rating Decending" icon is highlighted
	And the rating is sorted in decending order

Scenario: Sort price in ascending order
	Given the user navigates to the "Markets" screen
	When the "Price Header" button is clicked
	Then the "Price Ascending" icon is highlighted
	And the price is sorted in ascending order

Scenario: Sort price in decending order
	Given the user navigates to the "Markets" screen
	When the "Price Header" button is clicked
	And the "Price Header" button is clicked
	Then the "Price Decending" icon is highlighted
	And the price is sorted in decending order

Scenario: Sort indicator in ascending order
	Given the user navigates to the "Markets" screen
	When the "Indicator Header" button is clicked
	Then the "Indicator Ascending" icon is highlighted
	And the indicator is sorted in ascending order

Scenario: Sort indicator in decending order
	Given the user navigates to the "Markets" screen
	When the "Indicator Header" button is clicked
	And the "Indicator Header" button is clicked
	Then the "Indicator Decending" icon is highlighted
	And the indicator is sorted in decending order

Scenario: Sort volume in ascending order
	Given the user navigates to the "Markets" screen
	When the "Volume Header" button is clicked
	Then the "Volume Ascending" icon is highlighted
	And the volume is sorted in ascending order

Scenario: Sort volume in decending order
	Given the user navigates to the "Markets" screen
	When the "Volume Header" button is clicked
	And the "Volume Header" button is clicked
	Then the "Volume Decending" icon is highlighted
	And the volume is sorted in decending order

Scenario: Select exchanges to view market information
	Given the user navigates to the "Markets" screen
	When the "Exchanges" dropdown is clicked
	Then the "Supported Exchanges" menu is displayed

Scenario: View market information for markets
Expand a market to see the supported exchanges for a market with less than 5 supported exchanges.
	Given the user navigates to the "Markets" screen
	When the "Expand Markets" button is clicked
	Then all markets will be shown for the given market

Scenario: View market information for expanded markets
Expand a market to see the supported exchanges for a market that has more than 5 supported exchanges.
	Given the user navigates to the "Markets" screen
	When the "More Markets" button is clicked
	Then all markets will be shown for the given market

Scenario: View markets for a secondary currency
	Given the user navigates to the "Markets" screen
	And the "USDT" filter is clicked
	When the "BTC Symbol" button is clicked
	Then only "BTC" markets are visible

Scenario: View markets for a primary currency
	Given the user navigates to the "Markets" screen
	And the "USDT" filter is clicked
	When the "USDT Symbol" button is clicked
	Then only "USDT" markets are visible
