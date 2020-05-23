import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  
  /* **** Some hooks logic has been extracted out of this component and placed in useResults.js ****
          Basically just a function call that can take in parameters and return things.
          It will be executed each time this component needs to be rendered (column 1,2 and 3 of the lifecycle diagram)
          because the functional component is just one big function so things in it execute.
  */
  
  const [searchApi, results, errorMessage] = useResults();                

  const filterResultsByPrice = price => {                 // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <>
      <SearchBar        term={term}        onTermChange={setTerm}        onTermSubmit={() => searchApi(term)} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}               {/* conditional rendering design pattern */}
      <ScrollView>
            <ResultsList          results={filterResultsByPrice('$')}           title="Cost Effective"        />
            <ResultsList          results={filterResultsByPrice('$$')}          title="Bit Pricier"           />
            <ResultsList          results={filterResultsByPrice('$$$')}         title="Big Spender"           />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
