import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { LocationContext } from "../../../services/location/location.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Search = ({ isFavoritesToggled, onFavoritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  const onSubmitHandler = () => {
    search(searchKeyword);
  };

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search For a Location"
        onIconPress={onFavoritesToggle}
        icon={isFavoritesToggled ? "heart" : "heart-outline"}
        value={searchKeyword}
        onSubmitEditing={onSubmitHandler}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};

export default Search;

const styles = StyleSheet.create({});
