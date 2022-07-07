import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useProductStore } from '../store';
import Image from '../../../components/Image';
import { theme } from '../../../styles/theme';
import { Product } from '../../../types';

type Props = {
    isMarketingProduct: boolean;
    product?: Product;
    isError?: (noError: boolean) => void;
};

const ProductDetailContent: React.FunctionComponent<Props> = (props: Props) => {
    const { isMarketingProduct, product } = props;
    const { t } = useTranslation();
    const { store: productStore } = useProductStore();

    const [noError, setNoError] = React.useState<boolean>(true);

    return (
        <>
            <Box display="flex" flexDirection="row" columnGap="10%" width="70%" maxWidth="70%">
                {isMarketingProduct ? (
                    <Image src={product?.Image} height="25rem" width="25rem" />
                ) : (
                    <Image height="25rem" width="25rem" />
                )}
                <Box width="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography textTransform="uppercase" variant="h6">
                            {product?.Name}
                        </Typography>
                    </Box>
                    <Box
                        width="40rem"
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        padding="1rem 0"
                    >
                        {!isMarketingProduct ? (
                            <>
                                {productStore.productCode.Millimeter !== 0 && (
                                    <Box paddingRight="1rem">
                                        <Typography textTransform="uppercase">Giá tiền</Typography>
                                        <Typography textTransform="uppercase">{product?.GiaTien}</Typography>
                                        <Box
                                            width="16rem"
                                            display="flex"
                                            flexDirection="row"
                                            justifyContent="flex-start"
                                            columnGap="1rem"
                                            flexWrap="wrap"
                                            padding="1rem 0"
                                        ></Box>
                                    </Box>
                                )}

                                <Box>
                                    <Box
                                        width="16rem"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        rowGap="1rem"
                                        flexWrap="wrap"
                                        padding="1rem 0"
                                    ></Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box>
                                    <Typography textTransform="uppercase">
                                        {t('product.detail.choose_pellet_size')}
                                    </Typography>
                                    <Typography textTransform="uppercase">{product?.GiaTien}</Typography>
                                    <Box
                                        width="16rem"
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                        flexWrap="wrap"
                                        padding="1rem 0"
                                    ></Box>
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ProductDetailContent;

const StyledButton = styled(Button)`
    margin-top: 0.5rem;
    height: 3rem;
    width: 100%;
    text-transform: uppercase;
`;

const SelectButton = styled(Button)`
    display: block;
    text-align: center;
    height: 3.5rem;
    width: 4rem;
`;
const PackageTypo = styled(Typography)`
    position: relative;
    bottom: 2.65rem;
`;
const PelletTypo = styled(Typography)`
    position: relative;
    bottom: 2.5rem;
`;
