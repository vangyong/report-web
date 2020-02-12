
%define major_version 1
%define minor_version 0
%define build_version 0


Name: report-web
Version: %{major_version}.%{minor_version}.%{build_version}
Release: 1%{?dist}
Summary: The package provides report-web service.
Group: Applications/Productivity
License: commercial
URL: http://www.fengtuwei.com
Source0: report-web-%{major_version}.%{minor_version}.%{build_version}.tar.gz

Requires: nginx

%description
The package provides web frontend service.


%prep
%setup -q


%build
echo "ignore build phase due to use prebuilt binaries"


%install
rm -fr $RPM_BUILD_ROOT
mkdir -p $RPM_BUILD_ROOT
cp -rf $(pwd)/* $RPM_BUILD_ROOT


%clean
rm -rf $RPM_BUILD_ROOT


%files
%defattr(-,root,root,-)
/opt/report-web

%changelog

