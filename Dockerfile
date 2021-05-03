fROM ubuntu:20.04
LABEL Maintainer="Johann Fredrik Jadebeck <j.jadebeck@fz-juelich.de>"

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update -y
RUN apt-get install -y apt-utils
RUN apt-get install -y build-essential software-properties-common cmake libeigen3-dev \
    liblpsolve55-dev lp-solve libxerces-c-dev libhdf5-dev doxygen libncurses5-dev libncursesw5-dev \
    libsbml5-dev mpich libmpich-dev git
RUN apt-get install -y bzip2 libbz2-dev
RUN apt-get install -y coinor-clp coinor-libclp-dev
RUN apt-get install -y libglpk-dev
RUN apt-get install -y python3 python3-pip
RUN apt-get install -y libboost-all-dev
RUN apt-get install -y nodejs npm
RUN python3 -m pip install arviz

RUN mkdir margss
ADD . /margss

WORKDIR /margss/hops/
RUN mkdir cmake-build-release
WORKDIR /margss/hops/cmake-build-release
RUN cmake .. -DCMAKE_BUILD_TYPE=Release -DHOPS_TESTS=OFF && make -j4

WORKDIR /margss/PolyRound/
RUN python3 -m pip install -r requirements.txt 

WORKDIR /margss/frontend/
RUN npm i
RUN npm run build

WORKDIR /margss/backend/
RUN npm i
EXPOSE 8080

RUN apt-get update -y
RUN apt-get install curl -y
CMD npm run start
