import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

type Anchor = 'right';

const btnStyle = {
  position: 'absolute' as 'absolute',
  right: '2em',
  top: '1.5em',
};

const SearchHistory = () => {
  const [state, setState] = React.useState(false);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };

  const searchHistory = [
    'Suspendisse at augue interdum',
    'commodo turpis non, rutrum enim',
    'In nec lacus',
    'facilisis nisi condimentum malesuada',
    'Vivamus ultricies neque',
    'Maecenas tincidunt lacus quis massa',
  ];

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {searchHistory.map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
            <Divider />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('right', true)} style={btnStyle}>
        View History
      </Button>
      <Drawer
        anchor={'right'}
        open={state}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </div>
  );
};

export default SearchHistory;
