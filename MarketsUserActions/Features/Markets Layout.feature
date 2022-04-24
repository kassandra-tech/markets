@Markets
@Layout
Feature: Markets
This feature details the layout for the markets screen.

Scenario: Markets screen header layout
	Given the user navigates to the "Markets" screen
	Then the "Time" dropdown is displayed
	And the sortable "Market" is displayed
	And the sortable "Rank" is displayed
	And the "Rank Information" icon is displayed
	And the sortable "Rating" is displayed
	And the "Rating Information" icon is displayed
	And the sortable "Price" is displayed
	And the sortable "Range" is displayed
	And the sortable "Indicator" is displayed
	And the sortable "Volume" is displayed
	And the "Exchanges" dropdown is displayed
	And the "Markets" dataview is scrollable

Scenario: Market information layout
	Given the user navigates to the "Markets" screen
	Then the "BTC-USD" datarow contains the "BTC" icon
	And the "BTC-USD" datarow "Quote Currency" is "BTC"
	And the "BTC-USD" datarow "Primary Currency" is "USD"
	And the "BTC-USD" datarow "Market" is "BTC-USD"

Scenario: Rank information layout
	Given the user navigates to the "Markets" screen
	Then the "BTC-USD" datarow "Rank" is "#1"

Scenario: Rating information layout
	Given the user navigates to the "Markets" screen
	Then the "BTC-USD" datarow "Rating" is "A"

Scenario: Price information layout
	Given the user navigates to the "Markets" screen
	Then the "Quote Market Currency" icon is displayed in the "BTC-USD" datarow
	And the "Market Price" is ">0" for the "BTC-USD" market
	And the "Reference Currency" icon is displayed in the "BTC-USD" datarow
	And the "Reference Currency Price" is ">0" for the "BTC-USD" market

Scenario: Range information layout
	Given the user navigates to the "Markets" screen
	Then the "High Price" is ">0" for the "BTC-USD" market
	And the "Low Price" is ">0" for the "BTC-USD" market

Scenario: Indicator information layout
	Given the user navigates to the "Markets" screen
	Then the "Indicator %" label is displayed for the "BTC-USD" market
	And the "Indicator" label is displayed for the "BTC-USD" market
	And the "Indicator" image is displayed for the "BTC-USD" market

Scenario: Volume information layout
	Given the user navigates to the "Markets" screen
	Then the "USD Primary Market" icon is displayed for the "BTC-USD" market
	And the "Volume" item is ">0"

Scenario: Supported exchange icon layout
	Given the user navigates to the "Markets" screen
	Then the "Exchange" item icon is visible

Scenario: More supported exchange icons layout
	Given the user navigates to the "Markets" screen
	Then the "More Exchanges" item dropdown is visible

Scenario: Expanded markets per exchange
	Given the user navigates to the "Markets" screen
	When a "Market" is clicked
	Then the market is shwon for each exchange
