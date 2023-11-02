import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Switch, createStyles, Button, Card, Grid, TextInput, NumberInput, Text } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { When } from 'react-if';

const useStyles = createStyles((theme) => ({
    h1: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],
        fontSize: theme.fontSizes.lg,
        fontWeight: 'bold',
        margin: 'auto',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
        padding: theme.spacing.md,
        width: '80%',
        fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    },
    span: {
        fontWeight: '500',
        fontSize: theme.fontSizes.sm,
        fontFamily: 'apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    }
}));

const SettingsForm = () => {
    
    const { classes } = useStyles();
    const [show, setShow] = useState(false);
    const { 
        pageItems, 
        setPageItems, 
        showCompleted, 
        setShowCompleted, 
        sort, 
        setSort,
        saveLocally, 
    } = useContext(SettingsContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveLocally();
        setShow(true);
        e.target.reset();
    }
    
    return(
      <>
        <h1 className={classes.h1}><IconSettings />Manage Settings</h1>
        <Grid style={{width: '80%', margin: 'auto'}}>
            <Grid.Col xs={12} sm={6}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <form onSubmit={handleSubmit}>
                        <Text fontSize="xl" weight="bold">Update Settings</Text>
                            <Switch 
                                label="Show Completed ToDos" 
                                checked={showCompleted} 
                                onChange={(event) => setShowCompleted(event.target.checked)} />
                            <span className={classes.span}>Items per page</span>
                            <NumberInput 
                                placeholder={pageItems} 
                                onChange={setPageItems} />
                            <span className={classes.span}>Sort Keyword</span>
                            <TextInput placeholder={sort} onChange={(event) => setSort(event.target.value)} />
                            <Button type="submit">Show New Settings</Button>
                    </form>
                </Card>
            </Grid.Col>
            <Grid.Col xs={12} sm={6}>
                <When condition={show} >
                    <Card  shadow="sm" padding="lg" radius="md" withBorder>
                        <Text fontSize="xl" weight="bold">Updated Settings</Text>
                        <Text>{showCompleted ? 'Show' : 'Hide'} Completed Todos</Text>
                        <Text>Items Per Page: {pageItems}</Text>
                        <Text>Sort Keyword: {sort}</Text>
                    </Card>
                </When>
            </Grid.Col>
        </Grid>
      </>
    )
}

export default SettingsForm;