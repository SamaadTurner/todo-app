import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination, Card, Badge, CloseButton, Text, Group } from '@mantine/core';
import { Else, If, Then, When } from 'react-if';
import Auth from '../Auth';
import { AuthContext } from '../../Context/Auth';

function List({ list, toggleComplete, deleteItem }) {
  const { pageItems, showCompleted } = useContext(SettingsContext);
  const { isLoggedIn, can } = useContext(AuthContext)
  const [currentPage, setPage] = useState(1)

  const displayedItems = showCompleted
    ? list
    : list.filter((item) => !item.complete);
    console.log({displayedItems});

  const pages = Math.ceil(displayedItems.length / pageItems)
  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const finalItems = displayedItems.slice(firstItem, lastItem);
  
  return (
    <>
      {finalItems.map(item => (
        <Card shadow="md" mb="sm" withBorder key={item.id} >
          <When condition={!item.complete}>
            <Group position="apart">
              <Group>
                <If condition={isLoggedIn && can('update')}>
                  <Then>
                    <Badge color="green" variant="filled" onClick={() => toggleComplete(item.id)}>Pending</Badge>
                  </Then>
                  <Else>
                    <Badge color="green" variant="filled">Pending</Badge>
                  </Else>
                </If>
                <Text>{item.assignee}  </Text>
              </Group>
              <Auth capability={'delete'}>
                <CloseButton onClick={() => deleteItem(item.id)} />
              </Auth>
            </Group>
            <hr />
            <Text align="left">{item.text}</Text>
            <Text align="right" >Difficulty: {item.difficulty}</Text>
          </When>
          <When condition={item.complete}>
            <Group position="apart">
              <Group>
                <If condition={isLoggedIn && can('update')}>
                  <Then>
                    <Badge color="red" variant="filled" onClick={() => toggleComplete(item.id)}>Completed</Badge>
                  </Then>
                  <Else>
                    <Badge color="red" variant="filled">Pending</Badge>
                  </Else>
                </If>
                <Text>{item.assignee}  </Text>
              </Group>
              <Auth capability={'delete'}>
                <CloseButton onClick={() => deleteItem(item.id)} />
              </Auth>
            </Group>
            <hr />
            <Text align="left">{item.text}</Text>
            <Text align="right" >Difficulty: {item.difficulty}</Text>
          </When>
        </Card>
      ))}
      <Pagination value={currentPage} onChange={setPage} total={pages} />
    </>
  )
}

export default List;
