import React, { FC, useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { db } from './Firebase';

type Anchor = 'right';

const btnStyle = {
  position: 'absolute' as 'absolute',
  right: '2em',
  top: '1.5em',
};

interface IpanTo {
  lat: number | string;
  lng: number | string;
}

interface IsearchProp {
  panTo: (obj: IpanTo) => void;
  currentPosition: IpanTo;
  radiusAndCurrentLatLng: (data: any) => void;
}

const SearchHistory: FC<IsearchProp> = ({
  panTo,
  currentPosition,
  radiusAndCurrentLatLng,
}) => {
  const [histories, setHistory] = useState<any>([]);

  useEffect(() => {
    const unsub = db.collection('searchHistory').onSnapshot((snapshot) => {
      const allHistory = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(allHistory);
    });
    return () => {
      unsub();
    };
  }, []);

  const [state, setState] = useState(false);

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

  const showHistory = () => {
    console.log('WTF HEre');
  };

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {histories.map((history: any) => (
          <ListItem
            button
            key={history.id}
            onClick={showHistory(history.radius, history.lat, history.lng)}
          >
            <ListItemText primary={history.address} />
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
