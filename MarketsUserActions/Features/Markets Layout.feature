@Markets
@Layout
Feature: Markets
This feature details the layout for the markets screen.

Scenario: Markets screen header layout
	Given the user navigates to the "Markets" screen
	Then the "Time" dropdown header is visible
	And the sortable "Market" header is visible
	And the sortable "Rank" header is visible
	And the "Rank Information" icon is visible
	And the sortable "Rating" header is visible
	And the "Rating Information" icon is visible
	And the sortable "Price" header is visible
	And the sortable "Range" header is visible
	And the sortable "Indicator" header is visible
	And the sortable "Volume" header is visible
	And the "Exchanges" dropdown header is visible
	And the "Markets" container is scrollable

Scenario: Market information layout
	Given the user navigates to the "Markets" screen
	Then the "Market" item contains the "Secondary Market" icon
	And the "Market" item contains the "Secondary Market" symbol
	And the "Market" item contains the "Primary Market" symbol
	And the "Market" item contains the "Secondary Market Name"

Scenario: Rank information layout
	Given the user navigates to the "Markets" screen
	Then the "Rank" item contains "#"
	And the "Rank" item is ">0"

Scenario: Rating information layout
	Given the user navigates to the "Markets" screen
	Then the "Rating" item is a valid rating

Scenario: Price information layout
	Given the user navigates to the "Markets" screen
	Then the "Secondary Market Currency" item symbol is visible
	And the "Secondary Market Price" item is ">0"
	And the "Reference Currency" item symbol is visible
	And the "Reference Currency Price" item is ">0"

Scenario: Range information layout
	Given the user navigates to the "Markets" screen
	Then the "High Price" item is ">0"
	And the "Low Price" item is ">0"
	And the "Low Price" item is less than the "High Price" item

Scenario: Indicator information layout
	Given the user navigates to the "Markets" screen
	Then the "Indicator %" item is visible
	And the "Indicator" item label is visible
	And the "Indicator" item image is visible

Scenario: Volume information layout
	Given the user navigates to the "Markets" screen
	Then the "Primary Market Icon" item is visible
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
