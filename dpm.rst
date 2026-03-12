.. Copyright (c) 2026 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
.. SPDX-License-Identifier: Apache-2.0

.. _dpm:

Digital Asset Package Manager (Dpm)
###################################


``dpm`` is a command-line tool that does a lot of useful things related to the
SDK. It is a **drop-in replacement** for the now deprecated
:subsiteref:`Daml Assistant<daml-assistant>`.

Pre-requisites
**************

Dpm currently runs on Windows, macOS and Linux.

For full functionality, you must have installed:

1) `vscode download <https://code.visualstudio.com/download>`_
2) JDK 17 or greater, installed and part of your `JAVA_HOME`.  If you do not already have a JDK installed, try OpenJDK or `Eclipse Adoptium <https://adoptium.net/>`_.


.. _dpm-install:

Install
*******

When installing Dpm, you can set the ``DPM_HOME`` environment variable to change the location where the SDK and any future updates are installed. The default is

- ``${HOME}/.dpm/`` on mac and linux
- ``%APPDATA%/.dpm/`` on windows


.. _dpm-installation:

Installation Instructions
=========================

To install the latest version:


.. _mac-linux-initial-install:

Mac/Linux Installation
----------------------

.. code:: shell

   curl https://get.digitalasset.com/install/install.sh | sh


Windows Installation
--------------------

Download and run the `windows installer <https://get.digitalasset.com/install/latest-windows.html>`_, which will install the dpm sdk and set up the PATH variable for you.

Manual Installation Instructions
================================
If you prefer a more manual installation process, see :ref:`here <dpm-manual-installation>`.

.. _dpm-manual-managing-releases:

Managing and Upgrading SDK Versions
===================================

You can manage SDK versions manually by using ``dpm install``.

To install the SDK version specified in the daml.yaml, run:

.. code:: shell

  dpm install package

To install a specific SDK version, for example version ``3.4.11``, run:

.. code:: shell

  dpm install 3.4.11

To see the active SDK version

.. code:: shell

  dpm version --active

.. code:: shell

  3.4.12-snapshot.20251006.1451.85eca5a

To list the installed SDK versions, including the currently active one (marked with `*`):

.. code:: shell

  dpm version

.. code:: shell

    3.4.12-snapshot.20251003.1412.3fe167f
  * 3.4.12-snapshot.20251006.1451.85eca5a

To additionally list all the SDK versions that can be installed, as well as the installed versions:

.. code:: shell

  dpm version --all

To get the list in a machine readable format:

.. code:: shell

  dpm version --all -o json

.. code:: json

     [
        {
            "version": "3.4.9",
            "remote": true
        },
        {
            "version": "3.4.10",
            "installed": true,
            "remote": true
        },
        {
            "version": "3.4.11",
            "installed": true,
            "remote": true,
            "active": true
        }
    ]

.. _dpm_unstable_releases:

Unstable releases
=================
To install unstable SDKs you need to :ref:`configure dpm <dpm-configuration>` to look for them by setting the
``registry`` configuration field or ``DPM_REGISTRY`` environment variable to `europe-docker.pkg.dev/da-images/public-unstable`, then you can use the same ``dpm install`` command:

.. code:: shell

  dpm install <unstable SDK version>


.. _dpm-operate:

Operate
*******

- ``dpm build``:                    Build a Daml package or project

  This builds the Daml project according to the project config file ``daml.yaml`` (see `configuration files <dpm-configuration-files>`).

  In particular, it will use the dpm SDK (specified in the ``sdk-version`` field in ``daml.yaml``) to resolve dependencies and compile the Daml project.

  Given a ``daml.yaml`` and ``.daml`` source files, the ``dpm build`` command will generate a .dar for this package. See :externalref:`How to build Daml Archives <build_howto_build_dar_files>` for how to define a package and build it to a DAR.

- ``dpm test``:                     Test the current Daml project or the given files by running all test declarations.

  This runs all daml scripts defined within a package.

  Daml Scripts are top level values of type ``Script ()``, from the ``daml-script`` package. This package mimics a Canton Ledger Client for quick iterative testing,
  and direct support within :externalref:`Daml Studio <daml-studio>`. The command runs these scripts against a reference Ledger called the IDE Ledger, which implements the core functionality of the Canton Ledger without the complexity of multi-participant setups.

  It is most useful for verifying the fundamentals of your ledger model, before moving onto integration testing via the Ledger API directly, or the Daml Codegen.  ``dpm test`` also provides code coverage information for templates and choices used.

- ``dpm clean``:                    Clean a Daml package or project

  This removes any Daml artifact files created in your package during a daml build, including DARs.

- ``dpm codegen-alpha-java``:       codegen (alpha) for java
- ``dpm codegen-alpha-scala``:      codegen (alpha) for scala
- ``dpm codegen-alpha-typescript``: codegen (alpha) for typescript
- ``dpm codegen-java``:             Daml to Java compiler
- ``dpm codegen-js``:               Daml to JavaScript compiler
- ``dpm canton-console``:           Canton console client
- ``dpm daml-shell``:               daml-shell client for PQS
- ``dpm damlc``:                    Compiler and IDE backend for the Daml programming language
- ``dpm docs``:                     Generate documentation for a daml package from its documentation comments
- ``dpm init``:                     Initialize a ``daml.yaml`` project configuration file in the current directory
- ``dpm inspect-dar``:              Inspect a DAR archive
- ``dpm new``:                      Create a new Daml package
- ``dpm pqs``:                      participant query store
- ``dpm sandbox``:                  Run full Canton installation in a single process
- ``dpm script``:                   Daml Script Binary
- ``dpm studio``:                   Launch Daml Studio
- ``dpm upgrade-check``:            Check upgrade validity between package versions
- ``dpm validate-dar``:             Validate a DAR archive
- ``dpm install``:                  Install new SDK versions manually

  Note that you need to update your `project config file <#configuration-files>` to use the new version.


.. _dpm-configuration:

Configuration
*************

.. _dpm-configuration-files:

Project Configuration (``daml.yaml``)
=====================================

Each Daml project contains a ``daml.yaml`` file that defines the project's SDK version, dependencies, and build settings.

If a ``daml.yaml`` file doesn't exist in your project, you can create one with:

.. code:: shell

   dpm init

For details on ``daml.yaml`` fields and structure, see the project configuration reference.


.. _dpm-global-configuration:

Global Configuration (``dpm-config.yaml``)
==========================================

Global configuration is stored at ``${DPM_HOME}/dpm-config.yaml`` and is optional. It can be used for purposes such as:

- **Registry URL** -- Override the default OCI registry for SDK components.
- **Authentication** -- Point to registry credentials.
- **Insecure registry** -- Allow HTTP connections to a registry.

.. _dpm-variable-interpolation:

Variable Interpolation
======================

Both ``daml.yaml`` and ``dpm-config.yaml`` support variable interpolation, which lets you avoid hardcoded values (such as registry URLs or credentials paths) and instead reference environment variables or other dynamic values.


.. _dpm-daml-assistant-to-dpm-migration:

Migrating from the Daml Assistant to Dpm
*****************************************

This section provides a step-by-step guide for projects originally built with the Daml assistant (``daml``).

.. _dpm-migration-steps:

Migration Steps
===============

1. **Install Dpm**

   Follow the :ref:`installation instructions <dpm-installation>` above.

2. **Verify Dpm is in your PATH**

   .. code:: shell

      dpm version

3. **Remove ``~/.daml/bin`` from your PATH**

   Edit your shell configuration file (e.g., ``~/.bashrc``, ``~/.zshrc``, ``~/.profile``) and remove any line that adds ``~/.daml/bin`` to your ``PATH``.

4. **Remove the Daml assistant**

   .. code:: shell

      rm -rf ~/.daml

5. **Create a project configuration if needed**

   If a ``daml.yaml`` file doesn't already exist in your project, generate one:

   .. code:: shell

      dpm init

6. **Replace ``daml`` commands with ``dpm``**

   Most commands map directly. See the :ref:`command migration table <dpm-command-migration-table>` below.

   Six ``daml`` commands have been removed and replaced with Declarative API, Canton Console, JSON API, and/or gRPC API calls. See :ref:`removed command replacements <dpm-removed-commands>` for full details.

7. **Review project configuration**

   Review your ``daml.yaml`` to ensure it is compatible with dpm. See :ref:`project configuration <dpm-configuration-files>`.

8. **Review global configuration** (optional)

   Review or create ``${DPM_HOME}/dpm-config.yaml`` if you need to customize registry, authentication, or other global settings. See :ref:`global configuration <dpm-global-configuration>`.

9. **Set up variable interpolation** (optional)

   Use :ref:`variable interpolation <dpm-variable-interpolation>` in your configuration files to avoid hardcoded values.

10. **Update CI/CD pipelines** (if applicable)

    Update any CI/CD pipeline scripts that reference ``daml`` commands to use the corresponding ``dpm`` commands instead.


.. _dpm-command-migration-table:

Command Migration Table
=======================

+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml command                            | dpm command                    | purpose                                            |
+=========================================+================================+====================================================+
| daml new                                | dpm new                        | Create a new Daml project                          |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml build                              | dpm build                      | Compile the Daml project                           |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml test                               | dpm test                       | Run tests for the Daml project                     |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml install                            | dpm install                    | Install Daml SDK components                        |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml codegen java                       | dpm codegen-java               | Java code generation                               |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml codegen js                         | dpm codegen-js                 | TypeScript code generation                         |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml damlc                              | dpm damlc                      | Invoke the daml compiler                           |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml studio                             | dpm studio                     | Open project in Visual Studio                      |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml sandbox                            | dpm sandbox                    | Launch a Daml Sandbox                              |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml ledger allocate-parties            | See :ref:`removed commands     | Allocate parties on a ledger                       |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml ledger list-parties                | See :ref:`removed commands     | List parties on a ledger                           |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml ledger upload-dar                  | See :ref:`removed commands     | Upload (and vet) DARs on a ledger                  |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml ledger fetch-dar                   | See :ref:`removed commands     | Fetch a DAR from a ledger                          |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml start                              | See :ref:`removed commands     | Start a local Daml Ledger                          |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+
| daml packages                           | See :ref:`removed commands     | List packages on a ledger                          |
|                                         | <dpm-removed-commands>`        |                                                    |
+-----------------------------------------+--------------------------------+----------------------------------------------------+


.. _dpm-removed-commands:

Removed Command Replacements
=============================

The following ``daml`` commands have no direct ``dpm`` equivalent. Use the Declarative API, Canton Console, JSON API, or gRPC API instead.


``daml ledger allocate-parties``
--------------------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Method
     - Details
   * - Declarative API
     - .. code:: hocon

          canton.parameters.enable-alpha-state-via-config = yes
          canton.participants.sandbox.alpha-dynamic {
            parties = [
              { party = "Alice", synchronizers = ["mysync"] }
              { party = "Bob" }
            ]
          }
   * - Canton Console
     - ``ledger_api.parties.allocate(...)``
   * - JSON API
     - ``POST /v2/parties/external/allocate``
   * - gRPC
     - ``PartyManagementService.AllocateParty``


``daml ledger list-parties``
----------------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Method
     - Details
   * - Canton Console
     - ``ledger_api.parties.list()``
   * - JSON API
     - | ``GET /v2/parties``
       | ``GET /v2/parties/{party}``
   * - gRPC
     - ``PartyManagementService.ListKnownParties``


``daml ledger upload-dar``
--------------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Method
     - Details
   * - Declarative API
     - .. code:: hocon

          canton.parameters.enable-alpha-state-via-config = yes
          canton.participants.sandbox.alpha-dynamic.dars = [
            { location = "./my-asset.dar" },
            { location = "https://path.to/repo/token.dar",
              request-headers = { AuthenticationToken : "mytoken" } }
          ]
   * - Canton Console
     - ``ledger_api.packages.upload_dar(...)``
   * - JSON API
     - ``POST /v2/dars/``
   * - gRPC
     - ``PackageManagementService.UploadDarFile``


``daml ledger fetch-dar``
-------------------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Method
     - Details
   * - JSON API
     - ``GET /v2/packages/{package-id}``
   * - gRPC
     - ``PackageService.GetPackage``


``daml start``
--------------

Replace with ``dpm sandbox`` combined with ``dpm build``. Use the Declarative API or JSON/gRPC API to upload DARs and allocate parties as needed.

See :externalref:`Sandbox <dpm-sandbox>` for details on running a local Canton installation.


``daml packages``
-----------------

.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Method
     - Details
   * - Canton Console
     - ``ledger_api.packages.list()``
   * - JSON API
     - | ``GET /v2/packages``
       | ``GET /v2/packages/{package-id}/status``
   * - gRPC
     - ``PackageService.ListPackages``


.. _dpm-help:

Command Help
************

To see information about any command, run it with ``--help``.
