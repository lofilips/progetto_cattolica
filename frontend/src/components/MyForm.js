import React from 'react'
import { Button, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap'

function MyForm() {
    return (
        <ButtonGroup vertical>
        <Button>Button</Button>
        <Button>Button</Button>
        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-1">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
        <Button>Button</Button>
        <Button>Button</Button>
        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-2">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-vertical-dropdown-3">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>
        </ButtonGroup>
    )
}

export default MyForm