Feature: Rooms
  It displays rooms selector with user's allowed rooms and shows contacts for them

  Scenario: Starts initially with no selected room
    Given Selector mounted
    Then Starts with no selected room

  Scenario Outline: Clicking on the selector shows users allowed rooms
    Given No room has been selected
    When I select option <room>
    Then Shows <contactsLength> contacts to me
    And Contacts are <contacts>
    And Resets the select

    Examples:
    | room | contactsLength | contacts |
    | Room A |  2  |  Cpt. Jean Luc Picard, 2nd Officer LT commander Data |
