import React, { FC, useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

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
  reloadHistory: Boolean;
}

const GET_SEARCH_BY_EMAIL = gql`
  mutation GetSearchbyEmail($email: String) {
    getSearchbyEmail(email: $email) {
      id
      address
      lat
      lng
      radius
      email
    }
  }
`;

const SearchHistory: FC<IsearchProp> = ({
  panTo,
  currentPosition,
  radiusAndCurrentLatLng,
  reloadHistory,
}) => {
  const [histories, setHistory] = useState<any>([]);
  const [user] = useState(JSON.parse(localStorage.user));
  const [getSearchbyEmail, { error, data }] = useMutation<any>(
    GET_SEARCH_BY_EMAIL
  );

  useEffect(() => {
    if (error) {
      setHistory([]);
    }
    if (!error && data) {
      const values = Object.values(data)[0];
      setHistory(values);
    }
  }, [error, data]);

  useEffect(() => {
    if (user.email || reloadHistory) {
      getSearchbyEmail({ variables: { email: user.email } }).catch((e) => {
        console.error(e);
      });
    }
  }, [user, reloadHistory]);

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

  const showHistory = (radius: any, lat: any, lng: any) => {
    radiusAndCurrentLatLng({ radius, lat, lng });
    panTo({ lat, lng });
  };

  const list = (anchor: Anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {
        <List>
          {histories &&
            histories.map((history: any, index: number) => (
              <ListItem
                button
                key={index}
                onClick={() =>
                  showHistory(history.radius, +history.lat, +history.lng)
                }
              >
                <ListItemText primary={history.address} />
                <Divider />
              </ListItem>
            ))}
        </List>
      }
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
