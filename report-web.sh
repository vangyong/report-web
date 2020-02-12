#!/bin/bash

major_version=1
minor_version=0
build_version=0

project_name=report-web
pkg_name=$project_name-$major_version.$minor_version.$build_version

source_path=$(pwd)
spec_path=/root/rpmbuild/SPECS/$project_name.spec


# set npm environment
# export SASS_BINARY_PATH=/opt/node

# build package
npm install
npm run build:h5

# Package resources into rpm-based source tarball
rm -rf $project_name-*
workdir=$pkg_name/opt/report-web

mkdir -p $workdir

cp -rf dist/* $workdir

tar czvf $pkg_name.tar.gz $pkg_name
mv $pkg_name.tar.gz /root/rpmbuild/SOURCES
rm -fr $pkg_name


# Execute rpmbuild
cp -f $cfgdir/$project_name.spec $spec_path

rpmbuild -bb $spec_path
