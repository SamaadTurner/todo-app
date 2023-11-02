import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import List from '../List';
import { Button, TextInput, Grid, Slider, Card, createStyles } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import Auth from '../Auth';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    color: 'white',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '16px auto',
    padding: '16px',
    width: '80%',
    fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  }
}));

const Todo = () => {

  const { classes } = useStyles();
  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    (async function(){
      item.id = uuid();
      item.complete = false;
      await axios.post('https://api-js401.herokuapp.com/api/v1/todo', item);
      setList([...list, item]);
    })();
  }

  async function deleteItem(id) {
    const items = list.filter( item => item._id !== id );
    await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`)
    setList(items);
  }

  async function toggleComplete(id) {
    let updatedListItem = 0;
    const items = list.map( item => {
      if ( item._id === id ) {
        item.complete = ! item.complete;
      }
      updatedListItem = item
      return item;
    });
    await axios.put(`https://api-js401.herokuapp.com/api/v1/todo/${id}`, updatedListItem);
    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  useEffect(() => {
    (async function(){
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      let results = response.data.results;
      setList(results);
    })();
  }, [])

  return (
    <>
      <h1 data-testid="header-h1" className={classes.h1}>To Do List: {incomplete} items pending</h1>
      {/* leave the form code inside of the Todo Component */}
      <Grid style={{width: '80%', margin: 'auto'}}>
        <Grid.Col xs={12} sm={4}>
          <Auth capability={'create'}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <form onSubmit={handleSubmit}>
                <h2>Add To Do Item</h2>
                  <span>To Do Item</span>
                  <TextInput onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                  <span>Assigned To</span>
                  <TextInput onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                  <span>Difficulty</span>
                  <Slider
                        marks={[
                          { value: 20 },
                          { value: 40 },
                          { value: 60 },
                          { value: 80 },
                          { value: 100 },
                        ]}
                        onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty"/>
                  <Button type="submit">Add Item</Button>
              </form>
            </Card>
          </Auth>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List list={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
        </Grid.Col>
        </Grid>
    </>
  );
};

export default Todo;