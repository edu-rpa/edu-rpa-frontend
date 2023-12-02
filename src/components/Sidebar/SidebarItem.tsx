import { Box, Flex, FlexProps, Icon } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
}

const SidebarItem = ({ icon, children, ...props }: NavItemProps) => {
  return (
    <Box>
      <Flex
        align="center"
        p="2"
        m="2"
        rounded="lg"
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
        {...props}>
        {icon && (
          <div className="w-[40px] h-[40px] bg-white text-center flex justify-center items-center rounded-full mr-2">
            <Icon fontSize="20" color="#4FD1C5" as={icon} />
          </div>
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default SidebarItem;
