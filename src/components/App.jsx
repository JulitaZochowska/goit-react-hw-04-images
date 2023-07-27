import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import { Dna } from 'react-loader-spinner';

import React, { Component } from 'react';

import css from './App.module.css';
import Modal from './Modal';

const INITIAL_STATE = {
  searchInput: '',
  largeImageURI: '',
  imageGallery: [],
  totalHits: 0,
  isLoading: false,
  isModalOpen: false,
  isLoadMoreButtonEnabled: false,
  page: 1,
  perPage: 12,
};

class App extends Component {
  state = INITIAL_STATE;

  updateSearchInput = query => {
    if (query !== this.state.searchInput) {
      this.setState(prevState => ({ ...INITIAL_STATE, searchInput: query }));
    }
  };

  incrementPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  selectLargeImage = uri => {
    this.setState({ largeImageURI: uri, isModalOpen: true });
  };

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
    const { searchInput, isLoading, totalHits, page, perPage, imageGallery } =
      this.state;
    if (
      (searchInput !== prevState.searchInput || page !== prevState.page) &&
      searchInput.length > 0
    ) {
      const data = await this.fetchImages();
      this.setState(prevState => ({
        imageGallery: [...imageGallery, ...data.hits],
        totalHits: data.totalHits, // Przyda się do przycisku "load more" - będę porównywać ilość wyświetlonych obrazków z tym "totalHits" i na tej podstawie wyświetlać przycisk.
      }));
    }

    if (searchInput.length === 0) {
      this.setState({ ...INITIAL_STATE });
    }

    const isLoadMoreButtonEnabled = totalHits > page * perPage && !isLoading;
    // Porównujemy obecną wartość z poprzednią wartością, aby nie aktualizować
    // stanu niepotrzebnie - w tej metodzie stworzyłoby to
    // "nieskończony" ciąg wywołań (pętlę) - co zawiesi przeglądarkę
    if (prevState.isLoadMoreButtonEnabled !== isLoadMoreButtonEnabled) {
      this.setState({ isLoadMoreButtonEnabled: isLoadMoreButtonEnabled });
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true }); //Ważne jest, aby przy każdym "nowym" wyszukiwaniu wyresetować wartości
      const response = await fetch(
        `https://pixabay.com/api/?q=${this.state.searchInput}&page=${this.state.page}&key=36881053-d0d1537e2fca48fbbc934d91b&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`
      );

      return response.json();
    } catch (error) {
      console.error(error);
    } finally {
      // Możemy w opcjonalnym bloku finally umieścić instrukcje, które mają zawsze się wykonać, niezależnie od tego, czy wyjątek zostanie złapany, czy nie.
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.updateSearchInput} />
        <ImageGallery
          images={this.state.imageGallery}
          onEnlargeImage={this.selectLargeImage}
        />
        <div className={css.buttonLoaderWrapper}>
          <Dna
            visible={this.state.isLoading}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          {this.state.isLoadMoreButtonEnabled && (
            <Button onClick={this.incrementPage} />
          )}
        </div>
        {this.state.isModalOpen && (
          <Modal image={this.state.largeImageURI} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
