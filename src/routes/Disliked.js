import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CatContext } from "../helpers/CatContext";
import Select from "../helpers/Select";

import styled from "styled-components";
import Wrapper from "../components/Shared/Wrapper";
import GoBack from "../components/Shared/GoBack";
import NoItemFound from "../components/Shared/NoItemFound";
import Loader from "../components/Shared/Loader";

import {
  Pattern,
  Img,
  GridItemWithName,
  Label,
} from "../components/Shared/Masonry";

const Disliked = () => {
  const { disKey } = useContext(CatContext);
  const [disliked] = disKey;
  const [chunked, setChunked] = useState([]);
  const [loading, setLoading] = useState();
  const { handleSelectedClick } = Select();

  useEffect(() => {
    if (disliked.length > 0) {
      setLoading(true);
      const temporary = [...disliked];
      const result = [];
      while (temporary.length > 0) {
        result.push(temporary.splice(0, 10));
      }
      setLoading(false);
      setChunked(result);
    }
  }, [disliked]);

  // if there is no items disliked
  let message;
  if (disliked.length === 0) {
    message = <NoItemFound />;
  }

  return (
    <Wrapper>
      <GoBack btnContent="Disliked" />
      {message}

      {loading ? (
        <Loader />
      ) : (
        <>
          {chunked.map((tenCats, index) => (
            <Pattern key={index}>
              {tenCats.map((cat, index) => (
                <GridItemWithName key={cat.id} index={index}>
                  <Img src={cat.url} />
                  {cat.breeds.length > 0 ? (
                    <Label>
                      <StyledLink
                        to="/breeds/selected"
                        onClick={() => handleSelectedClick(cat)}
                      >
                        {" "}
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
        </>
      )}
    </Wrapper>
  );
};

export default Disliked;

const StyledLink = styled(Link)`
  color: #ff868e;
`;
