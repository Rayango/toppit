import React from 'react';
import SortList from './SortList.jsx';
import FilterList from './FilterList.jsx';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFilter, setSort } from '../js/actions/utilsBarActions.js';

import { changeFilteredList } from '../js/actions/topicListActions.js';

import { bindActionCreators } from 'redux';
import store from '../js/store.js';

class UtilsBar extends React.Component {
  constructor(props) {
    super(props);
  }

  sortTopicListByUpvotes(searchedTopicList) {
    return searchedTopicList.sort(function(a, b) {
      return b.upvotes - a.upvotes;
    });
  }

  sortTopicListByTimeStamp(searchedTopicList) {
    return searchedTopicList.sort(function(a, b) {
      return a.timestamp - b.timestamp;
    });
  }

  onSortChange(sortBy) {
    let newFilteredTopicList = [];
    //sets sort state with sortBy value
    this.props.setSort(sortBy);
    let searchedTopicList = JSON.parse(JSON.stringify(store.getState().topicList.searchedTopicList));
    //determines how to sort list by sortBy value
    if (sortBy === 'upvotes') {
      newFilteredTopicList = this.sortTopicListByUpvotes(searchedTopicList);
      console.log('SORTED BY UPVOTES...', newFilteredTopicList);
    } else if (sortBy === 'timeStamp') {
      newFilteredTopicList = this.sortTopicListByTimeStamp(searchedTopicList);
    }
    //changes viewed list
    this.props.changeFilteredList(newFilteredTopicList);
  }

  onFilterChange(filterBy) {
    let newFilteredTopicList = [];
    //sets filter state with filterBy value
    this.props.setFilter(filterBy);
    //gets emotion value
    let emotion = store.getState().utilsBar.filter.filterBy;
    let searchedTopicList = store.getState().topicList.searchedTopicList;
    //determines how to filter depending on emotion value
    if (emotion !== '') {
      newFilteredTopicList = searchedTopicList.filter((topic) => {
        return topic.emotion === emotion;
      });
    } else {
      newFilteredTopicList = searchedTopicList;
    }
    //changes viewed list to sorted list
    this.props.changeFilteredList(newFilteredTopicList);
  }

  render() {
    return (
      <Menu secondary>
        <Menu.Item position='right'>
          <SortList  
            defaultSort={this.props.defaultSort} 
            onSortChange={this.onSortChange.bind(this)}/>
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item>
            <FilterList 
              defaultFilter={this.props.defaultFilter}
              onFilterChange={this.onFilterChange.bind(this)}/>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  filter: state.filter,
  sort: state.sort
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFilter, setSort, changeFilteredList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UtilsBar);
