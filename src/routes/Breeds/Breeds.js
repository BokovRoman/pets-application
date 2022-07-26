import  { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BreedsContext } from "../../helpers/BreedsContext";
import Select from "../../helpers/Select";
import Loader from "../../components/Shared/Loader";
import Wrapper from "../../components/Shared/Wrapper";
import GoBack from "../../components/Shared/GoBack";
import BreedsSort from "./BreedsSort";
import Search from "components/Searchbar/Search";

import {
  Masonry,
  Pattern,
  Img,
  Label,
  GridItemWithName,
} from "../../components/Shared/Masonry";

const Breeds = () => {
  const { chunkedKey, currBreedKey, limitKey, catsKey, orderKey } = useContext(
    BreedsContext
  );
  const [chunked, setChunked] = chunkedKey;
  const [currBreed] = currBreedKey;
  const [limit] = limitKey;
  const [cats, setCats] = catsKey;
  const [order] = orderKey;
  const [loading, setLoading] = useState();
  // eslint-disable-next-line no-unused-vars
  const { selected, handleSelectedClick } = Select();
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const breedID = currBreed.id;
    setLoading(true);
    const fetchData = async () => {
      const response = await axios(
        `https://api.thedogapi.com/v1/images/search?limit=${limit}&order=${order}&has_breeds=true&size=med&breed_id=${
          breedID ? breedID : ""
        }`
      );
      setCats(response.data);
      setLoading(false);
    };
    setTimeout(() => fetchData(), 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, currBreed, order]);


  useEffect(() => {
    if (cats.length > 0) {
      setLoading(true);
      const temporary = [...cats];
      const result = [];
      while (temporary.length > 0) {
        result.push(temporary.splice(0, 10));
      }

      setChunked(result);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cats]);

  return (
    <>
      <Search isOpen={isOpen} setIsOpen={setIsOpen} />
      <Wrapper>
        <Span>
          <GoBack btnContent="Breeds" />
          <BreedsSort />
        </Span>
        {loading ? (
          <Loader />
        ) : (
          <Masonry>
            {chunked.map((tenCats, index) => (
              <Pattern key={index}>
                {tenCats
                  .sort((a, b) =>
                    a.width / a.height > b.width / b.height ? 1 : -1
                  )
                  .map((cat, index) => (
                    <GridItemWithName key={cat.id} index={index}>
                      <Img src={cat.url} />

                      {cat.breeds.length > 0 ? (
                        <Label>
                          <StyledLink
                            to="/breeds/selected"
                            onClick={() => handleSelectedClick(cat)}
                          >
                            {cat.breeds[0].name}
                          </StyledLink>
                        </Label>
                      ) : (
                        <Label>No name provided</Label>
                      )}
                    </GridItemWithName>
                  ))}
              </Pattern>
            ))}
          </Masonry>
        )}
      </Wrapper>
    </>
  );
};

export default Breeds;

const StyledLink = styled(Link)`
  color: #ff868e;
`;

const Span = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
