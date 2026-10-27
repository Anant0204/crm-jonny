-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 21, 2026 at 11:24 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `leadId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `type` enum('NOTE_ADDED','CALL_LOGGED','EMAIL_SENT','MEETING_HELD','STAGE_CHANGED','STATUS_CHANGED','LEAD_CONVERTED','TASK_CREATED','TASK_COMPLETED') NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `tenantId`, `userId`, `leadId`, `contactId`, `dealId`, `type`, `title`, `description`, `metadata`, `createdAt`) VALUES
('cmv1ysfb30005toycr25m38th', 'TENANT-08492', 'cmuo3wl50000ltoeojmmdwqth', NULL, 'cmv1ysfaq0003toycmjhnrc3b', NULL, 'NOTE_ADDED', 'Contact \'Stiv Smith\' was created', 'Company: Global, Type: Enterprise Client', NULL, '2026-10-10 05:39:21.855'),
('cmv1yua31000dtoyc4mvl5h77', 'TENANT-08492', 'cmuo3wl50000ltoeojmmdwqth', 'cmv1yua2l000btoycolttbs7x', NULL, NULL, 'NOTE_ADDED', 'Lead \'abd\' was created', 'Source: Direct Outreach, Estimated Value: $250000', NULL, '2026-10-10 05:40:48.397');

-- --------------------------------------------------------

--
-- Table structure for table `communications`
--

CREATE TABLE `communications` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `userId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `leadId` varchar(191) DEFAULT NULL,
  `channel` varchar(191) NOT NULL DEFAULT 'EMAIL',
  `direction` varchar(191) NOT NULL DEFAULT 'OUTBOUND',
  `sender` varchar(191) NOT NULL,
  `recipient` varchar(191) NOT NULL,
  `subject` varchar(191) DEFAULT NULL,
  `body` text NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'SENT',
  `provider` varchar(191) DEFAULT 'INTERNAL',
  `errorDetails` varchar(191) DEFAULT NULL,
  `attachments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attachments`)),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `assignedUserId` varchar(191) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `company` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `type` varchar(191) DEFAULT 'Enterprise Client',
  `title` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT 'Active',
  `lastActivity` datetime(3) DEFAULT NULL,
  `totalValue` decimal(12,2) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `tenantId`, `assignedUserId`, `name`, `company`, `email`, `phone`, `type`, `title`, `status`, `lastActivity`, `totalValue`, `createdAt`, `updatedAt`) VALUES
('cmv1ysfaq0003toycmjhnrc3b', 'TENANT-08492', 'cmuo3wl50000ltoeojmmdwqth', 'Stiv Smith', 'Global', 'smith@gmail.com', '4894394849', 'Enterprise Client', NULL, 'Active', '2026-10-10 05:39:21.839', 0.00, '2026-10-10 05:39:21.842', '2026-10-10 05:39:21.842');

-- --------------------------------------------------------

--
-- Table structure for table `deals`
--

CREATE TABLE `deals` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `leadId` varchar(191) DEFAULT NULL,
  `assignedUserId` varchar(191) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `customer` varchar(191) DEFAULT NULL,
  `value` decimal(12,2) NOT NULL DEFAULT 0.00,
  `stage` enum('NEW_LEAD','CONTACTED','QUALIFIED','OPPORTUNITY','PROPOSAL','NEGOTIATION','WON','LOST') NOT NULL DEFAULT 'NEW_LEAD',
  `probability` int(11) NOT NULL DEFAULT 50,
  `expectedClose` datetime(3) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ebox_messages`
--

CREATE TABLE `ebox_messages` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `senderId` varchar(191) NOT NULL,
  `senderName` varchar(191) NOT NULL,
  `recipient` varchar(191) NOT NULL DEFAULT 'Kiaan Tech Team',
  `subject` varchar(191) NOT NULL,
  `message` text NOT NULL,
  `priority` varchar(191) NOT NULL DEFAULT 'Normal',
  `isEncrypted` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ebox_messages`
--

INSERT INTO `ebox_messages` (`id`, `tenantId`, `senderId`, `senderName`, `recipient`, `subject`, `message`, `priority`, `isEncrypted`, `createdAt`) VALUES
('cmvaule9z0001url8b26umb6u', 'TENANT-08492', 'staff-swmtp-master', 'Master Admin', 'Vikram Mehta', '[SWMTP:conv-live-1792147910839] msg-swmtp-1792147910839', '88938e72e83f2ee402fa6355:5cfc63d44944a574128599fb2f3f6600c7a198996dd6a2facc96fcc31aacb9d18ac2dc51abafcda05e7ce0decd3949c4905af03be5cd1304:78634641e540d3f0006fff9aa51db69e', 'High', 1, '2026-10-16 10:51:51.045'),
('cmvauleb40003url8pylvpcuh', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Johnny', '9fca660618860871cf5e0cfe:f4061cefbcb9b69db8ee68f38090cd92c054db6e222b0014bf0504008445159913669277639f93630fff5ed279d5cf0a9b42d7eb3847d434db683c3012edd89eea89d187ff04fa:6b198de17416b5c491b43b403b6fd34b', 'Normal', 1, '2026-10-16 10:51:51.088'),
('cmvaulebd0005url8bk2j6pyc', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Business Owner', '850d19e027378e799ef05719:0fd250364f06e04bb47e6e5932b691a4b898767d44fd9eada6a022bf394ff8def12c9881b5437f45bb899a685d928e7818df8e62bdf337cf7711307c6acbd659572b331732df76:a0e594658808b976ff14817bbab42ab7', 'High', 1, '2026-10-16 10:51:51.098'),
('cmvauleg10007url846o3xu9y', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'Kiaan Tech Team', 'Normal Executive Board Memo', '9ce105aac1beff27b0be5b93:3685da2de813f242f3777c965685e330c13edad37b42182c749c9f385720fa14bd7b4dd3696426cfc9b61b857e2562e039902d5958de1d559b941dce4029a2030d9832484c3797222e5a23ef:7f4c67f91f4612633e48f9817350b59b', 'Normal', 1, '2026-10-16 10:51:51.265'),
('cmvauopwk0001urrct8axg1bd', 'TENANT-08492', 'staff-swmtp-master', 'Master Admin', 'Vikram Mehta', '[SWMTP:conv-swmtp-main] live-msg-639277646657171800', 'd9e33a822e623e92f360d3e4:443c37e65e372e2d9c5fe0dc21c045a5ff2d0abe50d4ed5b6c56be0d9746921ca2564bdc1bb055c73b74d5d19e927ed5d818421d91ad68281f774ad104ee53e10b61b6f7a4ff3ce9cbbd15fffd9922da8f4e1e0c:0179277719bd227ad8f0a9e6c649e29c', 'High', 1, '2026-10-16 10:54:26.080'),
('cmvaupyhc0003urrc6ef53tdw', 'TENANT-08492', 'crm-staff-001', 'Vikram Mehta', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Vikram Mehta', 'ed549b4de51c1aaa64aabf5d:367615471b7dd22d254d3af847bf682796a68103745b4599d9edb01f648dc77da89d5a59ecc01c2bfe333971da20a93b13c42636e06bb849116710048bf237cf4b840f74a1ac20648fd2b3edc72a9cd24eea905158de1ff78a5925b044385bdb3079:ea1c50e7a344867c8599eab10ece9303', 'High', 1, '2026-10-16 10:55:23.856'),
('cmvauvtq00005urrcqtfhi7ma', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-crm-sync] im-71cc9fcd7103db23', '58e26533abf7804fd1ccb58a:ee5cd0e7c7ad5a7b8a694ff8e0aede0c99d909d55bf2b8daa9cbbbf1ea5c465047587111adc5dfd3f7665603d4405e5e9c35a2787b9c203c66c33473334093a6:86d22900581f6830965e92f76600415a', 'High', 1, '2026-10-16 10:59:57.625'),
('cmvauvtr40007urrcvc5ceucm', 'TENANT-08492', 'crm-staff-001', 'Vikram Mehta', 'SWMTP Master Admin', '[SWMTP:conv-crm-sync] Reply by Vikram Mehta', '3f20fea33067ac963ac0f59c:5ba07215cd3002d2e5e218d53c63bd4d43aff684df30948cc8f7b42ae6e663e63a91bead4ba8350e8e9f888b8ecaf10e18e0ae0f27d63af8011218973fd4566a1026f4f0d8b933869cefb8f4614f26f0becf4724a672640ec61c528b95e97c20cdff8aac93caf3fdb1ac53cf6d8d87f63e06f89e:a8c5d61a355a70d66df3248b841f770a', 'High', 1, '2026-10-16 10:59:57.665'),
('cmvauw9970009urrcvazyjixk', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-987e98ec4db11f00] im-09bd47197bd34e14', 'f146b4c9af8a3fa8316f0b3c:4f1951b2b13b4991aaa56c26f280d89aa4854b799f38b9d2abfd14da13c2949418aa6963a6390572788e:710e287744f3219b46eb491faac03a17', 'High', 1, '2026-10-16 11:00:17.756'),
('cmvauw9ed000burrcnf9k58p0', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-987e98ec4db11f00] im-eb84f934c8dc48f6', '86266beba7d15085e2cf0ac1:4863ae07a2f89f83c60739435154c1f4bb4020683298bc0b9664dce647434f2c15e76c610da85760f55e:c33ba894d47f5747bffedf39a591799e', 'High', 1, '2026-10-16 11:00:17.941'),
('cmvauxcgn0001ur0wfjnl95lb', 'TENANT-08492', 'staff-swmtp-master', 'Master Admin', 'Vikram Mehta', '[SWMTP:conv-live-1792148468414] msg-swmtp-1792148468414', '28ac8c8985e41496f9cee5e0:a33f45ea0996fec582c6fc77b37c9c9e6540877d6c0e7bfb6220e62fcabd16b890dd4a036fa2e97a24957f3a5d3b6fa90eff465b0bb637a5:a74d13fbf0b77fb68a4ff514ca00d902', 'High', 1, '2026-10-16 11:01:08.567'),
('cmvauxchu0003ur0wbk464ooz', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792148468414] Reply by Johnny', 'd69331be61b5b3d566bd8157:6070e9370b0b6dd7b4a3dc0983820ec5535f5837aa8d8618b3ab7abae27bc9cd054fe36503423c3c8bad8e9ab4e41d879973ace2f1b80039a8b97ecfdc68dcafa537696b814939:f87a482e62aeac1e6277cb98d4e3184a', 'Normal', 1, '2026-10-16 11:01:08.611'),
('cmvauxci40005ur0w93wv58x7', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792148468414] Reply by Business Owner', '1dfde0b4cde4fff530901f23:0b8273157fdc28489fba301a5e1ad1f11990739dfe1d5bf6d345f70c8d1cd808edc692081720447a17c47457c828a508bda35133b52dd96724858528653c04c3f250266b842418:1c39bec8be1ffc5688c3283031a14973', 'High', 1, '2026-10-16 11:01:08.620'),
('cmvauxcmi0007ur0wobipumee', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'Kiaan Tech Team', 'Normal Executive Board Memo', '908bbd2a46ff96d22a5991b2:b02931ec91cdfe84b407ac336e46e79029e4082698e3adc35b1a287a427816353f79be2d0d64f6834e7a1cff37efdd0164b9e531ade42ada88809dc2282c0c87f0d672da4b697ba5f6284a8a:f07967a495ae16664f8eb78ad31fae30', 'Normal', 1, '2026-10-16 11:01:08.779'),
('cmvav41ww000durrc3ad0mkfl', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Johnny', '2798c0f06dc4eef08ab0e320:5a2d21ed013c2abaa5e24fde4258ecbda7618b3ae4944884dacdeb0d11c9039e4510fe7746d2d309067d4970802829866fd366bd:7f8272704c4ee8ad5b0c4ded98be7416', 'Normal', 1, '2026-10-16 11:06:21.484'),
('cmvav41xu000furrc6jo9d6r9', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Business Owner', 'fac629ef25a03abe75c1089b:eb763154c79cb8b8e63b8412a27f525fe227aa260be21d8a00a827e0eb8844d468909bc76e67cfbf1df877b89c6c075a31562d68:71c5e8cdee4f8f51eecf0cfc44b0f6c5', 'High', 1, '2026-10-16 11:06:21.521'),
('cmvavqkux000hurrcz0g4dx9x', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-crm-sync] im-4101011753f41f1f', '6308f52fcabdebef688a779f:020bcc35d9cdfc70de43e211f5bca8b1450b311da3c0c98782c8a2a42aca06fd9623aa311aaf4597d65bcd8d5c6e41a046fbd83880660a2adc96f9a79ddf69cf:3749bf579834f43ce8bd1810cf9659da', 'High', 1, '2026-10-16 11:23:52.468'),
('cmvavql0l000jurrclxy1h6ob', 'TENANT-08492', 'crm-staff-001', 'Vikram Mehta', 'SWMTP Master Admin', '[SWMTP:conv-crm-sync] Reply by Vikram Mehta', '54bf03a2fd37e82dbc2a6d9b:72be770416bb3d348f68dcdbe8a10456a15d6628383ea073ee34fad12d36863d4c37ca27756b13120a8dae4fd3f94638839543596a747bf70de1a28f6b625e6dca45d4379b1d314a1392fc5b418f66231003aa5a793061e9dfe908a7d655031cf560ca7c39dab9cb39c9aa0d9ed5ab9d797159d6:8369fb7f640b2f56b274c53cc23def77', 'High', 1, '2026-10-16 11:23:52.677'),
('cmvavs6e30001ur988d2g0w80', 'TENANT-08492', 'staff-swmtp-master', 'Master Admin', 'Vikram Mehta', '[SWMTP:conv-live-1792149906728] msg-swmtp-1792149906729', '1950d213246eff8cb233873b:7c1d6a21681d6339a867140c76acd6378f050493eb3d4979df00814593f0abe599a0673a367a511255bdeb3a929c97eac9eac1d748b35eb3:3b580e4a3bb8f215bd60e6cca3106d7f', 'High', 1, '2026-10-16 11:25:07.034'),
('cmvavs6f70003ur985ov0iked', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792149906728] Reply by Johnny', '551fd497c8d83b4e8622547d:662b711f1c2bfb6f094d13f967afd831de052dcd82b675bfdab7df91628460e5ccaa377022772fb6f3d29db430111150a96c87caf63e4c7c7f92e9c52af1698bf636556e27cabe:34914d68c83485d1e356499b430ae267', 'Normal', 1, '2026-10-16 11:25:07.075'),
('cmvavs6fh0005ur983cw41789', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792149906728] Reply by Business Owner', '2d7814e08ba978a8cfca9224:61081c269b3386f418911692cb4e5918d745e32fed19a8300d8cc7ce80fd434cc36addfcc397e2f23cf00018badce9cace190645c07a28d1586980b36a649a223d19c6f775fcd8:58b3f9392fb3bf99ad5b47379fa6b79d', 'High', 1, '2026-10-16 11:25:07.085'),
('cmvavs6o00007ur98j6rsrbca', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'Kiaan Tech Team', 'Normal Executive Board Memo', 'a6ffe1f00f006712fd135e73:998ba1947958d909faa154decf8f0729ea608c01ca0c45759884598c87c2254593abb274a33411bba33d24cf3800c0996dc7c7afb9b71438bcb2904f0bc8034e8ee3096d383891be47630ea7:b01c676bcc4ec6bba9dc7d409823cf12', 'Normal', 1, '2026-10-16 11:25:07.393'),
('cmvavstr1000lurrc4krlmvn1', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-7d3cdbf16072a1c7] im-e2ddc9e1d9d6ed75', '99dc72fa631e0a9a0ae3cde1:f75c540631886b02065e22752e1c85824b4a5ad5eabbf431f974eb9e29e8e448afe31f8a7780611d043d:b53b7a08f55d93e9c98b33cdc0f685a2', 'High', 1, '2026-10-16 11:25:37.309'),
('cmvavstyr000nurrcatrn51yf', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-7d3cdbf16072a1c7] im-2292a3f5284ed502', '5936caa8b6e04134d0521c84:5a79ddd67c8e4343542c2ea94a423520e9fc58c91c3f9ff75a7feba1ab01a10435707bdd273b70bc6e5f:17f26cdea80aecb902645009d7831c5d', 'High', 1, '2026-10-16 11:25:37.588'),
('cmvavsudw000purrcak9jdqit', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-441799ec3668396b] im-fc4858870cc883db', 'bbfb267ae31d4512deb599c4:68df29b9839a5b91504c1329905d226cbe2be7b18d5cb5f38bed09a41b16cddf67d46ea1de75a6d8d97b6a39837f9be1b62514aea1aaf60c6df90c550bd918fc20d5e31c071508aaeb6d7a6c:eb481a3cdbd5d8039a4a6d3a620a07fb', 'High', 1, '2026-10-16 11:25:38.132'),
('cmvavuxc0000rurrc8fu302yi', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-b6e36fb0bed66196] im-67e373e5913940eb', 'af91f66e171a80156ea7cce9:daade7e04b5e1e3ef2ff010b36f381c07b59081ff1d28d8a71f1af9b4a4815420a9114eeff92dc16e3380ab019839cfa311018ce8b69fc4c5b76d81715d878c8c1d92b54634dd9ff66eea501:3e7acb05fa49bbdfbcf511153c378952', 'High', 1, '2026-10-16 11:27:15.264'),
('cmvavzkd40001urxkonj9giok', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Johnny', '97564ef90ef29456c7f57957:64d273ac522e137c232fce061dcd760f3f6d6c:f6ac247fe925daf11cd5de68f2fb44b0', 'Normal', 1, '2026-10-16 11:30:51.735'),
('cmvavzkdi0003urxk05a7p7g4', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-live-1792147910839] Reply by Business Owner', '69ff1cbe9a916892bc801e52:ff76a696bcfa9463ab45836c68d05a9415554f:7b0323c9147f4325cba057474529c939', 'High', 1, '2026-10-16 11:30:51.751'),
('cmvaw2sz90005urxkwcdltl1s', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Johnny', '7912bac1a6e875e3d0f0edf0:b2d1f5b6dd90f50409:eabf2c9a58c5bda9328fcd220e29c76b', 'Normal', 1, '2026-10-16 11:33:22.869'),
('cmvaw2t070007urxk9pgdgdpo', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Business Owner', 'df74f5cd66e10b5874f079e2:13a267ac2795e1038a:30eef95e30c5cc5df6d4f50364f86e41', 'High', 1, '2026-10-16 11:33:22.903'),
('cmvawbn9f0009urxkdiz08h3s', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-9ca61e07c5bfd61a] im-eeb341e639e685ad', '820f60c7255fa97fba3339e8:43f0ad7d4acefa211248f31b9e7da79d31248dd0c625d6458e1d81529a6ef0d8ecceda7327e72a2639e5e255af003e7e21173362252f59e81cf1c836738ba94d7968ea9c1e40013ef20adfb7:79684b366fab7fe69ab5d30068b36d91', 'High', 1, '2026-10-16 11:40:15.359'),
('cmvawccwj000burxk69d33wog', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Johnny', 'bc2604a6dd878f848b4fe2ff:9a44c0287050dfa426cbf9648d:b62996df0212349422fed4c2ca55e593', 'Normal', 1, '2026-10-16 11:40:48.595'),
('cmvawccwx000durxkr0jdz188', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Business Owner', '06917a9abfc7ac4aa63ea857:e20a839c562527eac946efb6b9:d45c1a7aa1cee6b2a9a43147d7e77f64', 'High', 1, '2026-10-16 11:40:48.609'),
('cmvawdcbk000furxkp4tp76e7', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-9ca61e07c5bfd61a] im-5e65bae0c1232a67', 'b9f18e16ecdef96f2695bf49:72c0637cabdc36:b68532ebf40b3e1bfd8bc879ce50b842', 'High', 1, '2026-10-16 11:41:34.496'),
('cmvax4mo3000hurxkysah6f62', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-a32223a3d372a242] im-73a21155e37ef0b3', '6cd40d0d2ce3d45b3e6d4ea6:7b3a8bfa4478a55e7e90a978f351e07015479f0f7d7efe705ae1fb7855d133123e6c78f7e178c3127c400ea69ea65c70bee3e67b83193e9bab809fbda526d62e271eeed2d0783c2257daf43f:000be073d5164bf03404870dae997133', 'High', 1, '2026-10-16 12:02:47.616'),
('cmvay4nmy000jurxk4r5nbo43', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-swmtp-main] test-swmtp-live-1', '9e7c13dbae4839bd71489a8d:f5fbb56a6fd1002795476ac0a9d24222eac7d7e8ab91b1567ea16cd8d550b68d26f7adbc70d1076c30b9ba8d230245f403:eb61ea637ad3ef9d157d866ee159c4e0', 'High', 1, '2026-10-16 12:30:48.485'),
('cmvayc8x2000lurxkb206698r', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-2b4d3bbc4668b563] im-4b1092909fb88b54', 'ed7b1cae8cf2578a9ef96036:604a0a46bf8df474cc6906bda1c9229d3b04d154005bf5959253e0d53a4fbc8b887ee0c3896082a81d518958c62e4e3747e05b3f69ea4c75fc2fbe7715b06f28cbe65b16c8cd742717e2508d:ba2b0cbd50de57835b882dd44b0f492e', 'High', 1, '2026-10-16 12:36:42.657'),
('cmvaydc19000nurxkf5zgw5hy', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-c9e30c117241ab73] im-d8475dda29cc6044', '8fe2a4c5de30eb311bc522a9:d298302e46ebdb6b74b4:2cecae050c905420f12e49ab5c186e26', 'High', 1, '2026-10-16 12:37:33.357'),
('cmvaydkln000purxk7eq7gmoj', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Johnny', '691896f6b8ff292915b73597:7e27bd66eb74b9ddfb:488b7c74e987e29af18d86177b431c4f', 'Normal', 1, '2026-10-16 12:37:44.459'),
('cmvaydkmb000rurxkbdrp60u5', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Business Owner', '8ee5deccfd34bcf051ca1dfa:12a199d447b5ceb8fc:9d2b3688c7a4483e9edb0fb4aef09a78', 'High', 1, '2026-10-16 12:37:44.483'),
('cmvaydzfz000turxkfg8o5joe', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Johnny', '3c66f6da13a515dbc603ceed:692835cc0945e123fe2f6156e3ae:bc74a142579c9db9b1d4368dbad3b09e', 'Normal', 1, '2026-10-16 12:38:03.695'),
('cmvaydzge000vurxke1zznslj', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Business Owner', '221c737c87e61ef7cd99aa6c:4e389b5261f2c93c8dfe880487b9:8f3b8b75b453a08f6d5112c762007647', 'High', 1, '2026-10-16 12:38:03.705'),
('cmvayg8tj000xurxkmvm7k0ar', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-c9e30c117241ab73] im-9b2b2e78ed7d8366', '583931f1bc0d65580cdf9945:076600efcf:997ce76664dc3179b7d0912c6b0e5bd0', 'High', 1, '2026-10-16 12:39:49.159'),
('cmvazs4hn0001ur38trwbipmm', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Johnny', '1b4e213c910fd94850a39e29:90927295a3:42298c0cb9678d75b70ae29ff3390c9a', 'Normal', 1, '2026-10-16 13:17:03.006'),
('cmvazs4n60003ur387ou8kjjd', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Business Owner', '8a9c5cd82202d491cf7f8ff3:47b463dfab:d10b349968bbd6de2a45249eeda6f971', 'High', 1, '2026-10-16 13:17:03.234'),
('cmvazs72l0005ur38ik9ndw79', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Johnny', '7cd1c5a3184dfa1e3c1c10fd:472ba66af3:2ee9e6e95603b6d13513fb53ffdf3561', 'Normal', 1, '2026-10-16 13:17:06.381'),
('cmvazs7fg0007ur38xqixh2zb', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Business Owner', '54f0b3f67ae65a61e05ef475:faf9c5fc2b:1e0615e10ed0e4e0856504a8156bd193', 'High', 1, '2026-10-16 13:17:06.844'),
('cmvazveyd0009ur385jru7p83', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-c9e30c117241ab73] im-733ff39319535996', '321ee42f016336a6a5acd8fe:7bc6a4f4de:f1ce61e80f3b0836679bfdab37233a39', 'High', 1, '2026-10-16 13:19:36.564'),
('cmvazvqrb000bur38dn8w9l79', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Johnny', 'e1c0903abcfb39bed9194fc0:4cb4c8213f6898:3664d9c71fc3a12b1541178c98e53038', 'Normal', 1, '2026-10-16 13:19:51.858'),
('cmvazvqrv000dur38x6f7xc4k', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-c9e30c117241ab73] Reply by Business Owner', 'e2f96e2fad9d2330e95bf8ae:6f7be21587dde6:32ed6cf5dca74061d9d8f882b034a294', 'High', 1, '2026-10-16 13:19:51.883'),
('cmvc1qvdi0001urr88hxtoy5d', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-3e1b8bfecf2e5ffb] im-41db23cca8adefb6', 'f7d460129e46d95563f713ef:7199eb7052c47c9f3b8fa124c296c7a1e30e69ae705180bd9cafdc1d018a4d88f41c82f891d27cc3bc9f5cb50f64b9d3f2da149208e7720a799e9711e7de3f7ce325e7178c9f9fc95c42b61e:a28cb52054f82ec46987a01dc2f662f0', 'High', 1, '2026-10-17 06:59:49.972'),
('cmvc27inb0001url06ruyek35', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-39e71906640dc552] im-421369b4979c7e78', '568410fb3934d189d195d1c1:7898efa35a8589fe148fc38a15b0a67c3136b0a827065d4d9bf26ff58c5244ae0010bcd84cd68aabd231e8696132bc404ef91549d4278b5d52586d73d981db5bfa5c8b75512aaf0d94dd8f27:1663eb32913be385a3b3f4bd8589b1fa', 'High', 1, '2026-10-17 07:12:46.629'),
('cmvc327xd0001urict0c5cb4v', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-80af5c3b1926c5a6] im-5a447680b192f54e', 'ff6d991a34c0bd22df5783ed:247b57a4c90f3c6a0c39d747d9c71754425ce32b243375f710de34bea79f42f4fc33cde90c410a9b21ef29633ba5529b5eeebab8dff92c1ee29d624d6316fc9f429c38440edc7ad6e7524a4c:a4bddb470ea01762e269ba002bfcb23a', 'High', 1, '2026-10-17 07:36:39.071'),
('cmvc60qtu0001ur948aonh3x7', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-dcb8b14d22340a93] im-5d9fde5a8a3b075b', 'f98b50c3b6b16d1e03313fde:b9af0b8e5aa08677857e4bb998f802c8584f0d9f77051c11ca30a7ce7fc1db60a5a9c91a8fed57575f385ec6898e69362d1ddb54bba57aa7d7d1315e09c491b8fc7187505f0f616dba7a5ea4:b254f9c828566748bc16239c9bfaf826', 'High', 1, '2026-10-17 08:59:29.101'),
('cmvc7xtha0001urfoqtz9o89i', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-swmtp-main] im-30d43109f0814111', '47a03d63e01d52e6c1001328:fe9b45883954bccb162c8de63cc8334c594f2b039683f9436f549a52cd8617c4768c490ead2801:788b8c106c28fed6da34b7bbc3f10f8e', 'High', 1, '2026-10-17 09:53:11.804'),
('cmvc7y2320003urfoxr05otgb', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-swmtp-main] im-a829bad069a27f5b', 'c4b63fb64e700cf3ae95459c:c31a69981855171b5b5cf21d46a14c8a0ab5d7d0742a6f08918022d0ef52480487a0a057:ff69bf35e47bebf410993611b342c0ab', 'High', 1, '2026-10-17 09:53:22.958'),
('cmvc80fcd0005urfoasi5b572', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Johnny', 'ae53af52f190aec52c8660a9:29cd:cba6278c35729d7b2bdfee3610e8e6b3', 'Normal', 1, '2026-10-17 09:55:13.454'),
('cmvc80fct0007urfovbl282ge', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Business Owner', 'f88816cd6059e80cba45ffac:e141:1d635f838abd0852824ea001c4429aab', 'High', 1, '2026-10-17 09:55:13.469'),
('cmvc8h68d0009urfo1gahu0ct', 'TENANT-08492', 'crm-staff-001', 'Vikram Mehta', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Vikram Mehta', 'ca9b87b4aa9a0f88475ae1fc:b43516b78cd34bad1725b8d40e237d4f0cd92de0d3e8d5c080e5f8e5:d1a56f50b6ea9050046cba7da05302cd', 'High', 1, '2026-10-17 10:08:14.795'),
('cmvc9fvxj0001uras7q0kd0ud', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Vikram Mehta', '[SWMTP:conv-swmtp-main] test-img-msg-1792233314101', '61008f45e3151c6d3e9e827e:d73654c1faa7c796a878099053dc23f9cacf4aa842aa05f0869b59a61fbbbd8421725e6a6c64f3c47ccf2f0300f9f9857ba854651d0f775ab41f1f376c4a51d519a677640cc83d1323d0c8be9673f4ef8467409f9827c048db21de7f2c9d95f60877f72096160bfe131885afdcbd4b895539db2f15828d05a16a3ca7edad45d4e927b4c70f1b9d555122444aaf6a79e3d57acbbe9f2e9549b1b944c4c40f844ab99ea49e87b75645928e3a4101ea1a86ad6808fbb8ab90070d3f65d79fd68e500a6fde02be4a8d733c0e10445aa283cf77d44d27d04d337443c55a7b:2e49daa64afc7a3ec8d0b2801a33a3c0', 'High', 1, '2026-10-17 10:35:14.402'),
('cmvc9hgw90001ur4k2ti0pusa', 'TENANT-08492', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'SWMTP Master Admin', '[SWMTP:conv-swmtp-main] Reply by Johnny with attachment', 'e9cac8083726bac23f865908:07bef3ff3dffa4ef0b83bb51cbd9091f8a377effa5c7cfb6f820af1a697747ecc97717378e96e3435198f8c61f1f5691545c2228a3aa18a42b3738cf5f33500797e86f630da64020f3decb98e9e33cecc26b78e7763de2886917f368e30161bfee90e735e278e55d345158b1de9274eedb93941a03ea675e758963647d140b6e76217db47decf6803f1c4029f6d5dc889c544fcd713ab7330632c5b435cc7bbeec2443477d91a60d90b603e40acfc3ef0a943f6b71e5e7c66fa3b0de2718d800260889d8eb3e61c2d7e042a1162ac23681cb42f61d84276c795d8f2fe1c9b2b0e1d6a2b2cf03ad2888efa2b9c703ed2dd57806578fb8f82b9d4f450c580a0e5f5d17c0680b70860015615ad8523c1f95a3a89b75f5ee0a851fdce3adcbfe9e76d1474c73e6b41aa33cf16796e88d80b3d4e58bcdf8a0b423fbf4b933406100c00d892cc53868575ec5af60404dc7cdbfbcf5b2038f14fa91f7de882acf6f343ebe8ac0cadc5de12ae280774317d2a0b64a1a26e4f1878c1e418c6b46086f7dc7a75e6535:f508f7e9cfad1f637d7971a6332a9556', 'Normal', 1, '2026-10-17 10:36:28.233'),
('cmvhqzxh80001urdslsgil7bo', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-a4556c1e0a57f6c8] im-f3cbf895e7ae0cd1', 'dd6072cdad1799885633d5ce:052742607813c4768a8b9a12cc0112289021a74676de696f17c7cd1d84b7aef94b22629e67c330dfe2e2029ead3a02c8885f1db94fb6500a923cd8e2d6cf595ffe42ede3b33e980e32774f54:ebee24355561d3b42c7f65f63c2bc1f8', 'High', 1, '2026-10-21 06:45:33.881'),
('cmvhr9kae0003urds6q2xv4js', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-e01a6ddef19ab753] im-c3af8a7b3938d468', 'f6026c2a32873eb0094a9a16:96a710aa4bbf061f56839117c0c59e3bb0763f335d2a236e7f859e491f9a0ad74fe0fbd5cc7866afcc8af485df018d1f9c352e145511d697a9b9a88610e312c0fffd81c516e526bdeaf4ed61:81283f5b76c2c41800ec2a11a5942b1f', 'High', 1, '2026-10-21 06:53:03.350'),
('cmvhrhqdj0005urdsuxgvf112', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-f9021f06991bb952] im-76fa180de7a7defe', 'ca0b2ce5afffedf90add8e3e:9d0f763bb7219c901bcd6db7df90925766d36e01c81b5177906e0ba4e8a936143564a0189e01d8e13bdcab507bce7032105494f68251d26983aa775f6e73dcd1d3336479a88807e7d1f06752:abafea7273c5f4762a879b8ecf4f7e92', 'High', 1, '2026-10-21 06:59:24.487'),
('cmvhrk99h0007urdslc9akqya', 'TENANT-08492', 'swmtp-core', 'Admin', 'Vikram Mehta', '[SWMTP:conv-test] test-probe-1', 'faa7d8332174841730bf7ba5:b8636f204950c3468517:3bcf334ef4caa10b3fa142009981f5a9', 'High', 1, '2026-10-21 07:01:22.277'),
('cmvhrr2vf0009urdsvkutloph', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-1c15d70b70f8e4bc] im-f80ec0b33dcf6806', '6f86dda0614f336b12d1e63f:ee5a41abef3914d832a9242e0a8b130e0c8c3ce7479dc97d80be6e195f53d7b66bd75b552ae7474bc44db779680861ca26f57b31c44c8ac0d33b1ace1bf9b82400e847246932c93887407b9e:2e90095b8a550792846d3eab938287a4', 'High', 1, '2026-10-21 07:06:40.587'),
('cmvhrtk2c000burds4pk0d2qw', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-66240ab4fc49af36] im-166954fca4fbb5f4', 'b8c2b35b9fed6db26c41bae1:7710843c13a23b07453107b2938bfd6e172af506c73f86a4783723151b306e6c8839f7195bbabfb84e90257baa825f3efd2664e5ce9a36dc909b3928f9862e61a7d8a05eea5166148e71656a:273ceb7a5c5b85619991b059cfd0baa9', 'High', 1, '2026-10-21 07:08:36.180'),
('cmvhs5m4z000durdsxg8t0w1r', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-4bc3c935d1e09711] im-779029ed1f170945', 'd1da153d438ebf6d60148f28:6872fad586f9b29846610bc1fce0f8f31e064683d1dff9cda67a9a2e6e2ba4408b5c7e7dd07a60ce9aab37d2383a1747ae1347c44043eb18358c3c61c056ce48b82e99048482b52559dcd534:6380102a9c3bd2350dae294f864b41f8', 'High', 1, '2026-10-21 07:17:58.740'),
('cmvhsdcfb000furdsd9h5mb32', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-fa5c9f77dd96bc90] im-e3568e376b81238f', 'feecb3e16f52e11542404bba:f28ef70a48a4e4471c6a0977184ad1df9684073557df8518ca390df3af4f88aaa920e386a27a37431138b1fe18769f2db27b7b18ad0cac9f5c6b91d148789fb42420ce9e9291b1d476426ab3:a201f3df95865c11d97c021932449907', 'High', 1, '2026-10-21 07:23:59.400'),
('cmvhsf0k4000hurdskgz0b7ej', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-27dc4c59983540b4] im-d591c90cd9e271f3', '9e36b169602cc665070ec2b9:d76f4cf1309d248ff99f45113eb4b95c61ffcd1f2465c9dcaf6ae319b85a477626b20a42127cba970a9b489c5567b1a9c01843f857f82b7d506530caf42bd71132b52ef6b078290a789dc343:1cbf21a8315f8cca7f7d976fdea8a742', 'High', 1, '2026-10-21 07:25:17.333'),
('cmvhsq9zc000jurdsjl7d29q7', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-350210f19a7e8660] im-e0fc104bd6d8dca3', 'b7fe4faa801df6ae68206717:44eb0040297cdbbfca40f6850d88e7cb8ad838509ad990c100ec5242d078b9db27abd8810a3e8f50cca6cfb0ae2dd7264087d032910a26c49d0f848bb8adea2c107f97913e19f25a683ebce3:df8b8f82e8bd3c7c08072780c3b48a89', 'High', 1, '2026-10-21 07:34:02.760'),
('cmvhsxo04000lurds10bbnfkw', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-6ddc7e1e1b9a5199] im-31ce076d9f062dd0', 'bce81acedc0b786256f1032c:2af2799b4b6b8eeecfcb4e95729476fe73d2a27931747361fb2c8e2220dfd5a4edfbabbda97d9d802835f71cce3c678f107599da45c98179f91f255993584e973574e67a99735b1b30126593:3dd6abb98bb1fc7ea29d2b433cff4196', 'High', 1, '2026-10-21 07:39:47.524'),
('cmvht9xs4000nurdsq5t4eptq', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-e0a036c0efa4abcd] im-0cf5f00efb3edecb', '3a8907fe03d8ebef56f9ac92:09c398055f09d9576148cb811f51f08ea04c45033b061d36ab8d4c8949038f2ef62b018ecfa47445286355977a352496d7403b85ce227286037a4650809503e46fd86e212aa894847a2871a0:8229ae39b54acdf5711ca720a95d52e9', 'High', 1, '2026-10-21 07:49:20.067'),
('cmvhvezru000purdsfhu9zeo3', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-738a4ef60e0fe7b3] im-e00715964c9a6feb', '1797e435dbeca63d6ed942e6:16c2ff9eed0c67559b4fceec86395cdb489a4ad4bd258172fe104b5853ae38553275819d76f5dc6e3fb8523fc9c5bc5ae3c809a5822923402b2e21325589c4f1f85ec20b117e0f94db8982e8:a79a47afaad5bbe8a4fbea9b3aa5993c', 'High', 1, '2026-10-21 08:49:15.160'),
('cmvhw8g6q000rurdsdyqzfq2x', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-057e1cf6ec512df3] im-b39705823dd73f8d', 'c3bf541136f4bd3c2fec4025:dd777d24281e49a911e82624ae41f32e8b62ddfa21812bbd39e3c6e66e90ca5dd344164d005daa8de525a33374327ec29f68d8a78f24ad4be81b95cc4a9fbbd7deca15e1ed159e79aeb84012:ac462dcfe713703072c8158456c8b738', 'High', 1, '2026-10-21 09:12:09.454'),
('cmvhwkqv8000turdsnltbtax4', 'TENANT-08492', 'staff-admin-01', 'Master Administrator', 'Elena Rostova', '[SWMTP:conv-9e8d4878de74a5ce] im-6029a5cf0fc08457', '8922162304075c8ca0d184e7:9b46cc9c6792fb457f8e64b815c26a92c0ffba110c6b1df487b28ddee8b0a7aee9c851b8f90a4411452fd7a54b071edbee39f8f75bf8e5756bde4de9dd62bcb427bcbf9578ce70adb74879de:f14b28dd48ab49417eeed170b342f6ec', 'High', 1, '2026-10-21 09:21:43.172');

-- --------------------------------------------------------

--
-- Table structure for table `erp_projects`
--

CREATE TABLE `erp_projects` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `assignedUserId` varchar(191) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `client` varchar(191) NOT NULL,
  `budget` decimal(12,2) NOT NULL DEFAULT 0.00,
  `spent` decimal(12,2) NOT NULL DEFAULT 0.00,
  `progress` int(11) NOT NULL DEFAULT 0,
  `status` varchar(191) NOT NULL DEFAULT 'In Progress',
  `manager` varchar(191) DEFAULT NULL,
  `deadline` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hr_candidates`
--

CREATE TABLE `hr_candidates` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `role` varchar(191) NOT NULL,
  `stage` varchar(191) NOT NULL DEFAULT 'Applied',
  `score` int(11) NOT NULL DEFAULT 85,
  `experience` varchar(191) DEFAULT NULL,
  `resumeUrl` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hr_employees`
--

CREATE TABLE `hr_employees` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `employeeId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `department` varchar(191) NOT NULL,
  `designation` varchar(191) NOT NULL,
  `salary` decimal(12,2) NOT NULL DEFAULT 0.00,
  `joiningDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `payrollStatus` varchar(191) NOT NULL DEFAULT 'Processed',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items`
--

CREATE TABLE `inventory_items` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `sku` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'Hardware',
  `warehouse` varchar(191) NOT NULL DEFAULT 'Austin Central',
  `quantity` int(11) NOT NULL DEFAULT 0,
  `minThreshold` int(11) NOT NULL DEFAULT 50,
  `unitCost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Optimal',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `invoiceNumber` varchar(191) NOT NULL,
  `customerId` varchar(191) DEFAULT NULL,
  `customerName` varchar(191) NOT NULL,
  `customerEmail` varchar(191) DEFAULT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `projectId` varchar(191) DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `subtotal` decimal(12,2) NOT NULL DEFAULT 0.00,
  `tax` decimal(12,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Sent',
  `dueDate` datetime(3) DEFAULT NULL,
  `issueDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`items`)),
  `notes` text DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_articles`
--

CREATE TABLE `knowledge_articles` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `category` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `isPublished` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knowledge_articles`
--

INSERT INTO `knowledge_articles` (`id`, `tenantId`, `title`, `category`, `content`, `views`, `isPublished`, `createdAt`, `updatedAt`) VALUES
('cmv1ydo0h0001toyc6ox2u1mq', 'TENANT-08492', 'ff', 'CRM & Pipeline', 'aaa', 0, 1, '2026-10-10 05:27:53.295', '2026-10-10 05:27:53.295');

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `assignedUserId` varchar(191) DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `company` varchar(191) NOT NULL,
  `email` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `source` varchar(191) DEFAULT NULL,
  `territory` varchar(191) DEFAULT NULL,
  `status` enum('NEW','CONTACTED','QUALIFIED','PROPOSAL','WON','LOST') NOT NULL DEFAULT 'NEW',
  `qualification` varchar(191) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 75,
  `estimatedValue` decimal(12,2) DEFAULT NULL,
  `convertedToContactId` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leads`
--

INSERT INTO `leads` (`id`, `tenantId`, `assignedUserId`, `name`, `company`, `email`, `phone`, `source`, `territory`, `status`, `qualification`, `score`, `estimatedValue`, `convertedToContactId`, `createdAt`, `updatedAt`) VALUES
('cmv1yua2l000btoycolttbs7x', 'TENANT-08492', 'cmuo3wl50000ltoeojmmdwqth', 'abd', 'solar', 'abd@gmail.com', NULL, 'Direct Outreach', 'North America', 'NEW', NULL, 85, 250000.00, NULL, '2026-10-10 05:40:48.380', '2026-10-10 05:40:48.380');

-- --------------------------------------------------------

--
-- Table structure for table `ledger_accounts`
--

CREATE TABLE `ledger_accounts` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `accountName` varchar(191) NOT NULL,
  `type` varchar(191) NOT NULL,
  `balance` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Reconciled',
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `authorId` varchar(191) DEFAULT NULL,
  `leadId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `content` text NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `production_orders`
--

CREATE TABLE `production_orders` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `orderNumber` varchar(191) NOT NULL,
  `productName` varchar(191) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `bomCode` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Scheduled',
  `startDate` datetime(3) DEFAULT NULL,
  `completionDate` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `poNumber` varchar(191) DEFAULT NULL,
  `vendor` varchar(191) NOT NULL,
  `items` text NOT NULL,
  `amount` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Pending Approval',
  `eta` varchar(191) DEFAULT NULL,
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales_orders`
--

CREATE TABLE `sales_orders` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `projectId` varchar(191) DEFAULT NULL,
  `orderNumber` varchar(191) DEFAULT NULL,
  `customer` varchar(191) NOT NULL,
  `items` text NOT NULL,
  `total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Processing',
  `date` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_call_sessions`
--

CREATE TABLE `staff_call_sessions` (
  `id` varchar(64) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `conversationId` varchar(64) DEFAULT NULL,
  `callType` varchar(32) NOT NULL DEFAULT 'audio',
  `callerPlatformId` varchar(64) NOT NULL,
  `callerStaffId` varchar(128) NOT NULL,
  `callerName` varchar(150) NOT NULL,
  `recipientPlatformId` varchar(64) NOT NULL,
  `recipientStaffId` varchar(128) NOT NULL,
  `recipientName` varchar(150) NOT NULL,
  `status` varchar(32) NOT NULL DEFAULT 'initiated',
  `startedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `connectedAt` datetime(3) DEFAULT NULL,
  `endedAt` datetime(3) DEFAULT NULL,
  `durationSeconds` int(11) NOT NULL DEFAULT 0,
  `terminationReason` varchar(64) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT current_timestamp(3) ON UPDATE current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff_call_sessions`
--

INSERT INTO `staff_call_sessions` (`id`, `tenantId`, `conversationId`, `callType`, `callerPlatformId`, `callerStaffId`, `callerName`, `recipientPlatformId`, `recipientStaffId`, `recipientName`, `status`, `startedAt`, `connectedAt`, `endedAt`, `durationSeconds`, `terminationReason`, `createdAt`, `updatedAt`) VALUES
('call_1792220977123_777c6d31', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:09:37.315', '2026-10-17 07:09:37.436', NULL, 0, 'test_cleanup', '2026-10-17 07:09:37.315', '2026-10-17 12:42:10.462'),
('call_1792221131025_4c994c82', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:12:11.052', '2026-10-17 07:12:11.097', '2026-10-17 07:12:11.124', 0, 'normal_hangup', '2026-10-17 07:12:11.052', '2026-10-17 07:12:11.125'),
('call_1792221132162_39872a4c', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:12:12.164', NULL, '2026-10-17 07:12:12.199', 0, 'normal_hangup', '2026-10-17 07:12:12.164', '2026-10-17 07:12:12.200'),
('call_1792221133220_09d402cd', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:12:13.233', NULL, '2026-10-17 07:12:13.262', 0, 'normal_hangup', '2026-10-17 07:12:13.233', '2026-10-17 07:12:13.263'),
('call_1792221134282_495db768', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:12:14.283', NULL, '2026-10-17 07:12:14.313', 0, 'normal_hangup', '2026-10-17 07:12:14.283', '2026-10-17 07:12:14.315'),
('call_1792221135346_25b1b0cb', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 07:12:15.361', NULL, '2026-10-17 07:12:15.368', 0, 'declined_by_recipient', '2026-10-17 07:12:15.361', '2026-10-17 07:12:15.370'),
('call_1792221136396_06f41682', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 07:12:16.408', NULL, '2026-10-17 07:12:16.930', 0, 'caller_cancelled', '2026-10-17 07:12:16.408', '2026-10-17 07:12:16.931'),
('call_1792222049997_9eda2c31', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:27:30.132', '2026-10-17 07:27:30.260', '2026-10-17 07:27:30.304', 0, 'normal_hangup', '2026-10-17 07:27:30.132', '2026-10-17 07:27:30.306'),
('call_1792222051338_bcfa4024', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:27:31.341', NULL, '2026-10-17 07:27:31.383', 0, 'normal_hangup', '2026-10-17 07:27:31.341', '2026-10-17 07:27:31.386'),
('call_1792222052408_a56d014f', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:27:32.423', NULL, '2026-10-17 07:27:32.451', 0, 'normal_hangup', '2026-10-17 07:27:32.423', '2026-10-17 07:27:32.454'),
('call_1792222053467_c4793969', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:27:33.470', NULL, '2026-10-17 07:27:33.507', 0, 'normal_hangup', '2026-10-17 07:27:33.470', '2026-10-17 07:27:33.509'),
('call_1792222054537_b955266b', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 07:27:34.557', NULL, '2026-10-17 07:27:34.563', 0, 'declined_by_recipient', '2026-10-17 07:27:34.557', '2026-10-17 07:27:34.565'),
('call_1792222055596_36be92cc', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 07:27:35.608', NULL, '2026-10-17 07:27:36.165', 0, 'caller_cancelled', '2026-10-17 07:27:35.608', '2026-10-17 07:27:36.170'),
('call_1792222323389_1b6a3e1b', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:32:03.412', '2026-10-17 07:32:03.469', '2026-10-17 07:32:05.706', 0, 'normal_hangup', '2026-10-17 07:32:03.412', '2026-10-17 07:32:05.708'),
('call_1792222326733_14088830', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:32:06.735', NULL, '2026-10-17 07:32:06.772', 0, 'normal_hangup', '2026-10-17 07:32:06.735', '2026-10-17 07:32:06.774'),
('call_1792222327806_5a3a19ab', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:32:07.817', NULL, '2026-10-17 07:32:07.851', 0, 'normal_hangup', '2026-10-17 07:32:07.817', '2026-10-17 07:32:07.853'),
('call_1792222328877_71e42b12', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:32:08.879', NULL, '2026-10-17 07:32:08.929', 0, 'normal_hangup', '2026-10-17 07:32:08.879', '2026-10-17 07:32:08.931'),
('call_1792222329957_650f8c6a', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 07:32:09.970', NULL, '2026-10-17 07:32:09.978', 0, 'declined_by_recipient', '2026-10-17 07:32:09.970', '2026-10-17 07:32:09.980'),
('call_1792222331015_7c46adb9', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 07:32:11.032', NULL, '2026-10-17 07:32:11.548', 0, 'caller_cancelled', '2026-10-17 07:32:11.032', '2026-10-17 07:32:11.550'),
('call_1792222545144_15ade0b3', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:35:45.232', '2026-10-17 07:35:45.290', '2026-10-17 07:35:47.545', 2, 'normal_hangup', '2026-10-17 07:35:45.232', '2026-10-17 07:35:47.547'),
('call_1792222548563_bd73e331', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:35:48.565', NULL, '2026-10-17 07:35:48.609', 0, 'normal_hangup', '2026-10-17 07:35:48.565', '2026-10-17 07:35:48.611'),
('call_1792222549648_afe9b564', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:35:49.868', NULL, '2026-10-17 07:35:49.897', 0, 'normal_hangup', '2026-10-17 07:35:49.868', '2026-10-17 07:35:49.898'),
('call_1792222550916_ea5787a6', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:35:50.918', NULL, '2026-10-17 07:35:50.956', 0, 'normal_hangup', '2026-10-17 07:35:50.918', '2026-10-17 07:35:50.957'),
('call_1792222551990_f558a4cc', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 07:35:52.014', NULL, '2026-10-17 07:35:52.020', 0, 'declined_by_recipient', '2026-10-17 07:35:52.014', '2026-10-17 07:35:52.022'),
('call_1792222553048_a0323278', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 07:35:53.063', NULL, '2026-10-17 07:35:53.588', 0, 'caller_cancelled', '2026-10-17 07:35:53.063', '2026-10-17 07:35:53.589'),
('call_1792223572866_901a16ff', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:52:52.980', '2026-10-17 07:52:53.068', '2026-10-17 07:52:55.315', 2, 'normal_hangup', '2026-10-17 07:52:52.980', '2026-10-17 07:52:55.316'),
('call_1792223576340_40080de0', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:52:56.343', NULL, '2026-10-17 07:52:56.385', 0, 'normal_hangup', '2026-10-17 07:52:56.343', '2026-10-17 07:52:56.386'),
('call_1792223577415_86e4a139', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 07:52:57.433', NULL, '2026-10-17 07:52:57.494', 0, 'normal_hangup', '2026-10-17 07:52:57.433', '2026-10-17 07:52:57.495'),
('call_1792223578509_f244a10f', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 07:52:58.510', NULL, '2026-10-17 07:52:58.538', 0, 'normal_hangup', '2026-10-17 07:52:58.510', '2026-10-17 07:52:58.539'),
('call_1792223579550_4e9e48f3', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 07:52:59.562', NULL, '2026-10-17 07:52:59.568', 0, 'declined_by_recipient', '2026-10-17 07:52:59.562', '2026-10-17 07:52:59.569'),
('call_1792223580598_69fcac12', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 07:53:00.610', NULL, '2026-10-17 07:53:01.137', 0, 'caller_cancelled', '2026-10-17 07:53:00.610', '2026-10-17 07:53:01.138'),
('call_1792226630629_3d76038a', 'TENANT-08492', 'test-conv-e2e-a', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 08:43:51.000', '2026-10-17 08:43:51.242', NULL, 0, 'test_cleanup', '2026-10-17 08:43:51.000', '2026-10-17 14:16:11.129'),
('call_1792226772508_b9be9fd2', 'TENANT-08492', 'test-conv-e2e-a', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 08:46:12.587', '2026-10-17 08:46:12.863', '2026-10-17 08:46:13.981', 1, 'caller_hangup', '2026-10-17 08:46:12.587', '2026-10-17 08:46:13.988'),
('call_1792226775309_a297051c', 'TENANT-08492', 'test-conv-e2e-b', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 08:46:15.311', '2026-10-17 08:46:15.432', '2026-10-17 08:46:16.269', 0, 'caller_hangup', '2026-10-17 08:46:15.311', '2026-10-17 08:46:16.271'),
('call_1792226805305_89ad6ff2', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 08:46:45.356', '2026-10-17 08:46:45.453', '2026-10-17 08:46:47.872', 2, 'normal_hangup', '2026-10-17 08:46:45.356', '2026-10-17 08:46:47.876'),
('call_1792226808903_a2d5b72a', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 08:46:48.905', NULL, '2026-10-17 08:46:48.968', 0, 'normal_hangup', '2026-10-17 08:46:48.905', '2026-10-17 08:46:48.970'),
('call_1792226810003_a6e1eed8', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'completed', '2026-10-17 08:46:50.029', NULL, '2026-10-17 08:46:50.105', 0, 'normal_hangup', '2026-10-17 08:46:50.029', '2026-10-17 08:46:50.107'),
('call_1792226811156_1997f0b4', 'TENANT-08492', 'conv-swmtp-main', 'video', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 08:46:51.158', NULL, '2026-10-17 08:46:51.209', 0, 'normal_hangup', '2026-10-17 08:46:51.158', '2026-10-17 08:46:51.211'),
('call_1792226812248_62bdd47b', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'declined', '2026-10-17 08:46:52.263', NULL, '2026-10-17 08:46:52.273', 0, 'declined_by_recipient', '2026-10-17 08:46:52.263', '2026-10-17 08:46:52.275'),
('call_1792226813311_93f446bf', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'cp-crm-nergy', 'crm-staff-001', 'Vikram Mehta', 'missed', '2026-10-17 08:46:53.331', NULL, '2026-10-17 08:46:53.888', 0, 'caller_cancelled', '2026-10-17 08:46:53.331', '2026-10-17 08:46:53.889'),
('call_1792228462257_7a0c1b8f', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'missed', '2026-10-17 09:14:22.270', NULL, '2026-10-17 09:14:39.413', 0, 'caller_cancelled', '2026-10-17 09:14:22.270', '2026-10-17 09:14:39.497'),
('call_1792228486814_af0871b4', 'TENANT-08492', 'conv-swmtp-main', 'audio', 'cp-crm-nergy', 'cmuo3wl3c0001toeory5wre6k', 'Business Owner', 'cp-swmtp-core', 'staff-admin-01', 'Master Administrator', 'completed', '2026-10-17 09:14:46.821', '2026-10-17 09:14:51.852', '2026-10-17 09:15:02.931', 11, 'normal_hangup', '2026-10-17 09:14:46.821', '2026-10-17 09:15:02.938');

-- --------------------------------------------------------

--
-- Table structure for table `support_tickets`
--

CREATE TABLE `support_tickets` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `ticketNumber` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(191) NOT NULL DEFAULT 'Technical',
  `priority` varchar(191) NOT NULL DEFAULT 'Medium',
  `status` varchar(191) NOT NULL DEFAULT 'Open',
  `assignedUserId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `slaHours` int(11) NOT NULL DEFAULT 24,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `assignedUserId` varchar(191) DEFAULT NULL,
  `leadId` varchar(191) DEFAULT NULL,
  `contactId` varchar(191) DEFAULT NULL,
  `dealId` varchar(191) DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `priority` enum('LOW','MEDIUM','HIGH','URGENT') NOT NULL DEFAULT 'MEDIUM',
  `status` enum('PENDING','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `dueDate` datetime(3) DEFAULT NULL,
  `reminder` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenants`
--

CREATE TABLE `tenants` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `domain` varchar(191) DEFAULT NULL,
  `subscription` varchar(191) DEFAULT 'ACTIVE',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `parentId` varchar(191) DEFAULT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  `status` varchar(191) DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenants`
--

INSERT INTO `tenants` (`id`, `name`, `domain`, `subscription`, `createdAt`, `updatedAt`, `parentId`, `settings`, `status`) VALUES
('cmunoyqx50000tovon49iw6gx', 'Tenant B Logistics', 'tenant-b.com', 'ACTIVE', '2026-09-30 05:55:34.217', '2026-09-30 05:55:34.217', NULL, NULL, 'ACTIVE'),
('TENANT-08492', 'nErgy Enterprise Logistics', 'nergy.io', 'ACTIVE', '2026-09-30 05:52:09.743', '2026-09-30 05:52:09.743', NULL, NULL, 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `territories`
--

CREATE TABLE `territories` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `code` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `region` varchar(191) NOT NULL,
  `states` varchar(191) DEFAULT NULL,
  `managerId` varchar(191) DEFAULT NULL,
  `targetQuota` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` varchar(191) NOT NULL DEFAULT 'Active',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) NOT NULL,
  `tenantId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `role` enum('BUSINESS_OWNER','CUSTOMER','CONTENT_CREATOR','CONTENT_BUILDER','INFLUENCER','AFFILIATE_PARTNER','AI_MARKETING_PRO','HR','OPERATIONS_SALES_ADMIN','FINANCE_COMPLIANCE_ADMIN','CRM_PRO','SUPER_ADMIN') NOT NULL DEFAULT 'CRM_PRO',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `avatar` longtext DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `tenantId`, `name`, `email`, `passwordHash`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES
('cmuo3wl3c0001toeory5wre6k', 'TENANT-08492', 'Business Owner', 'business.owner@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'BUSINESS_OWNER', 1, 'data:image/jpeg;base64,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zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzTTTzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzgTzzwzhTTTzzzzzzjjzTzzzzzzzzzxTzzzzzzzzxTzzzzjzzxzTzzzwxDjyxzzzzzzzzzxTzzzzzzzxCzzzzRzzDTzzzzzgQzzzzzzzzzzzzzxTzzzzzzzgzzzzzzxQzxDzzzzzzzzzzzzzzzzzzzxTzzzzzzzjzzzyjwTzzzjSjyhzzzzzzzzzzzzzzzxTzzzzzzywDzzhyxzyTDxSzyxTzzzzzzzzzzzzzzxTzzzzzzyizzyzTzzzijzyjziQjCzzzzzzzzzzzzxTzzzzzzzwBTyhzxzzzzjTBAzzzzzyDDzzzzzzzzxTzzzzzzzyjTyzjyjTzzzwzjTzzyjCyzzzzzzzzzxTzzzzzzzzyjTwzzwjwRzjyRzzjixxSzzzzzzzzzxTzzzzzzzzzzywzzzzzzxDiQzhwzjyQzTzzzzzzzxTzzzzzzzzzzzzzzzziQwwgDSzzwTgyTTzzzzzzzxTzzzzzzzzzzzzzzxhzTzzzxzzzhzzzzzzzzzzzzxTzzzzzzzzzzzzzzzxQRDTzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzyzzzzzzzzzwzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzxizTzzzDSjzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzziSxzzzgzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzyzjDThzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzwxzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzz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', '2026-09-30 12:53:47.589', '2026-10-10 05:21:19.062'),
('cmuo3wl3m0003toeoslzck7oq', 'TENANT-08492', 'Customer', 'customer@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'CUSTOMER', 1, 'data:image/jpeg;base64,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zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzTTTzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzgTzzwzhTTTzzzzzzjjzTzzzzzzzzzxTzzzzzzzzxTzzzzjzzxzTzzzwxDjyxzzzzzzzzzxTzzzzzzzxCzzzzRzzDTzzzzzgQzzzzzzzzzzzzzxTzzzzzzzgzzzzzzxQzxDzzzzzzzzzzzzzzzzzzzxTzzzzzzzjzzzyjwTzzzjSjyhzzzzzzzzzzzzzzzxTzzzzzzywDzzhyxzyTDxSzyxTzzzzzzzzzzzzzzxTzzzzzzyizzyzTzzzijzyjziQjCzzzzzzzzzzzzxTzzzzzzzwBTyhzxzzzzjTBAzzzzzyDDzzzzzzzzxTzzzzzzzyjTyzjyjTzzzwzjTzzyjCyzzzzzzzzzxTzzzzzzzzyjTwzzwjwRzjyRzzjixxSzzzzzzzzzxTzzzzzzzzzzywzzzzzzxDiQzhwzjyQzTzzzzzzzxTzzzzzzzzzzzzzzzziQwwgDSzzwTgyTTzzzzzzzxTzzzzzzzzzzzzzzxhzTzzzxzzzhzzzzzzzzzzzzxTzzzzzzzzzzzzzzzxQRDTzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzyzzzzzzzzzwzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzxizTzzzDSjzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzziSxzzzgzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzyzjDThzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzwxzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzz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', '2026-09-30 12:53:47.603', '2026-10-08 10:46:20.084'),
('cmuo3wl3t0005toeocyz1uqqk', 'TENANT-08492', 'Content Creator', 'content.creator@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'CONTENT_CREATOR', 1, NULL, '2026-09-30 12:53:47.609', '2026-09-30 12:53:47.609'),
('cmuo3wl3y0007toeoj027rocg', 'TENANT-08492', 'Content Builder', 'content.builder@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'CONTENT_BUILDER', 1, NULL, '2026-09-30 12:53:47.614', '2026-09-30 12:53:47.614'),
('cmuo3wl420009toeo92vzkhro', 'TENANT-08492', 'Influencer', 'influencer@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'INFLUENCER', 1, NULL, '2026-09-30 12:53:47.619', '2026-09-30 12:53:47.619'),
('cmuo3wl48000btoeoqg47fegq', 'TENANT-08492', 'Affiliate Partner', 'affiliate.partner@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'AFFILIATE_PARTNER', 1, NULL, '2026-09-30 12:53:47.624', '2026-09-30 12:53:47.624'),
('cmuo3wl4f000dtoeonzy8q5jg', 'TENANT-08492', 'AI Marketing Pro', 'ai.marketing@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'AI_MARKETING_PRO', 1, NULL, '2026-09-30 12:53:47.631', '2026-09-30 12:53:47.631');
INSERT INTO `users` (`id`, `tenantId`, `name`, `email`, `passwordHash`, `role`, `isActive`, `avatar`, `createdAt`, `updatedAt`) VALUES
('cmuo3wl4k000ftoeojzegitnl', 'TENANT-08492', 'HR', 'hr@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'HR', 1, 'data:image/jpeg;base64,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zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzTTTzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzzzgTzzwzhTTTzzzzzzjjzTzzzzzzzzzxTzzzzzzzzxTzzzzjzzxzTzzzwxDjyxzzzzzzzzzxTzzzzzzzxCzzzzRzzDTzzzzzgQzzzzzzzzzzzzzxTzzzzzzzgzzzzzzxQzxDzzzzzzzzzzzzzzzzzzzxTzzzzzzzjzzzyjwTzzzjSjyhzzzzzzzzzzzzzzzxTzzzzzzywDzzhyxzyTDxSzyxTzzzzzzzzzzzzzzxTzzzzzzyizzyzTzzzijzyjziQjCzzzzzzzzzzzzxTzzzzzzzwBTyhzxzzzzjTBAzzzzzyDDzzzzzzzzxTzzzzzzzyjTyzjyjTzzzwzjTzzyjCyzzzzzzzzzxTzzzzzzzzyjTwzzwjwRzjyRzzjixxSzzzzzzzzzxTzzzzzzzzzzywzzzzzzxDiQzhwzjyQzTzzzzzzzxTzzzzzzzzzzzzzzzziQwwgDSzzwTgyTTzzzzzzzxTzzzzzzzzzzzzzzxhzTzzzxzzzhzzzzzzzzzzzzxTzzzzzzzzzzzzzzzxQRDTzzzzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzyzzzzzzzzzwzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzxizTzzzDSjzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzziSxzzzgzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzyzjDThzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzwxzzzzzzzzzzzzzzzxTzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzxTzzzzzzzz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', '2026-09-30 12:53:47.637', '2026-10-08 07:24:16.704'),
('cmuo3wl4p000htoeo3taieysg', 'TENANT-08492', 'Operations/Sales Admin', 'operations.admin@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'OPERATIONS_SALES_ADMIN', 1, NULL, '2026-09-30 12:53:47.641', '2026-09-30 12:53:47.641'),
('cmuo3wl4u000jtoeo2m4cmegr', 'TENANT-08492', 'Finance/Compliance Admin', 'finance.admin@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'FINANCE_COMPLIANCE_ADMIN', 1, NULL, '2026-09-30 12:53:47.646', '2026-09-30 12:53:47.646'),
('cmuo3wl50000ltoeojmmdwqth', 'TENANT-08492', 'CRM Pro', 'crm.pro@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'CRM_PRO', 1, NULL, '2026-09-30 12:53:47.652', '2026-09-30 12:53:47.652'),
('cmuo3wl55000ntoeo8qagixl1', 'TENANT-08492', 'Super Admin', 'super.admin@nergy.io', '$2b$10$6NZnagCPFaHjKOfMDVqDxu5.jXIVdbGUhVHpnNU8aQCFfVkxgNmXe', 'SUPER_ADMIN', 1, NULL, '2026-09-30 12:53:47.658', '2026-09-30 12:53:47.658'),
('crm-staff-001', 'TENANT-08492', 'Vikram Mehta', 'vikram.m@crmnergy.io', '$2b$10$w47t.68eAr6xzDKl4pvLMunS71sEROGoChDZlZBWnYGVmAG5YxNfC', 'OPERATIONS_SALES_ADMIN', 1, NULL, '2026-10-16 16:13:15.213', '2026-10-16 16:13:15.213'),
('crm-staff-002', 'TENANT-08492', 'Elena Rostova', 'elena.r@crmnergy.io', '$2b$10$w47t.68eAr6xzDKl4pvLMunS71sEROGoChDZlZBWnYGVmAG5YxNfC', 'CRM_PRO', 1, NULL, '2026-10-16 16:13:15.213', '2026-10-16 16:13:15.213');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('16710b09-429f-48cc-be2d-dae4f26178a0', '48a4f431e1725ff8eab1985529e3a8c89ae0f307528826a054315b35f4cba297', '2026-09-30 05:37:37.123', '20260930053733_init_crm_schema', NULL, NULL, '2026-09-30 05:37:33.937', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activities_tenantId_idx` (`tenantId`),
  ADD KEY `activities_tenantId_createdAt_idx` (`tenantId`,`createdAt`),
  ADD KEY `activities_leadId_idx` (`leadId`),
  ADD KEY `activities_contactId_idx` (`contactId`),
  ADD KEY `activities_dealId_idx` (`dealId`),
  ADD KEY `activities_userId_idx` (`userId`);

--
-- Indexes for table `communications`
--
ALTER TABLE `communications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `communications_tenantId_idx` (`tenantId`),
  ADD KEY `communications_contactId_idx` (`contactId`),
  ADD KEY `communications_leadId_idx` (`leadId`),
  ADD KEY `communications_userId_idx` (`userId`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contacts_tenantId_idx` (`tenantId`),
  ADD KEY `contacts_tenantId_email_idx` (`tenantId`,`email`),
  ADD KEY `contacts_assignedUserId_idx` (`assignedUserId`);

--
-- Indexes for table `deals`
--
ALTER TABLE `deals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `deals_tenantId_idx` (`tenantId`),
  ADD KEY `deals_tenantId_stage_idx` (`tenantId`,`stage`),
  ADD KEY `deals_contactId_idx` (`contactId`),
  ADD KEY `deals_leadId_idx` (`leadId`),
  ADD KEY `deals_assignedUserId_idx` (`assignedUserId`);

--
-- Indexes for table `ebox_messages`
--
ALTER TABLE `ebox_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ebox_messages_tenantId_idx` (`tenantId`);

--
-- Indexes for table `erp_projects`
--
ALTER TABLE `erp_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `erp_projects_dealId_key` (`dealId`),
  ADD KEY `erp_projects_tenantId_idx` (`tenantId`),
  ADD KEY `erp_projects_contactId_idx` (`contactId`),
  ADD KEY `erp_projects_dealId_idx` (`dealId`),
  ADD KEY `erp_projects_assignedUserId_fkey` (`assignedUserId`);

--
-- Indexes for table `hr_candidates`
--
ALTER TABLE `hr_candidates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hr_candidates_tenantId_idx` (`tenantId`);

--
-- Indexes for table `hr_employees`
--
ALTER TABLE `hr_employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hr_employees_tenantId_idx` (`tenantId`);

--
-- Indexes for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_items_tenantId_idx` (`tenantId`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_tenantId_idx` (`tenantId`),
  ADD KEY `invoices_customerId_idx` (`customerId`),
  ADD KEY `invoices_dealId_idx` (`dealId`),
  ADD KEY `invoices_projectId_idx` (`projectId`);

--
-- Indexes for table `knowledge_articles`
--
ALTER TABLE `knowledge_articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `knowledge_articles_tenantId_idx` (`tenantId`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leads_convertedToContactId_key` (`convertedToContactId`),
  ADD KEY `leads_tenantId_idx` (`tenantId`),
  ADD KEY `leads_tenantId_status_idx` (`tenantId`,`status`),
  ADD KEY `leads_assignedUserId_idx` (`assignedUserId`),
  ADD KEY `leads_createdAt_idx` (`createdAt`);

--
-- Indexes for table `ledger_accounts`
--
ALTER TABLE `ledger_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ledger_accounts_tenantId_idx` (`tenantId`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notes_tenantId_idx` (`tenantId`),
  ADD KEY `notes_leadId_idx` (`leadId`),
  ADD KEY `notes_contactId_idx` (`contactId`),
  ADD KEY `notes_dealId_idx` (`dealId`),
  ADD KEY `notes_authorId_idx` (`authorId`);

--
-- Indexes for table `production_orders`
--
ALTER TABLE `production_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `production_orders_tenantId_idx` (`tenantId`);

--
-- Indexes for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_orders_tenantId_idx` (`tenantId`);

--
-- Indexes for table `sales_orders`
--
ALTER TABLE `sales_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_orders_tenantId_idx` (`tenantId`),
  ADD KEY `sales_orders_dealId_idx` (`dealId`),
  ADD KEY `sales_orders_projectId_idx` (`projectId`),
  ADD KEY `sales_orders_contactId_idx` (`contactId`);

--
-- Indexes for table `staff_call_sessions`
--
ALTER TABLE `staff_call_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_crm_call_status` (`status`),
  ADD KEY `idx_crm_call_caller` (`callerStaffId`),
  ADD KEY `idx_crm_call_recipient` (`recipientStaffId`),
  ADD KEY `idx_crm_call_tenant` (`tenantId`);

--
-- Indexes for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `support_tickets_tenantId_idx` (`tenantId`),
  ADD KEY `support_tickets_assignedUserId_idx` (`assignedUserId`),
  ADD KEY `support_tickets_contactId_idx` (`contactId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_tenantId_idx` (`tenantId`),
  ADD KEY `tasks_tenantId_status_idx` (`tenantId`,`status`),
  ADD KEY `tasks_assignedUserId_idx` (`assignedUserId`),
  ADD KEY `tasks_dueDate_idx` (`dueDate`),
  ADD KEY `tasks_leadId_fkey` (`leadId`),
  ADD KEY `tasks_contactId_fkey` (`contactId`),
  ADD KEY `tasks_dealId_fkey` (`dealId`);

--
-- Indexes for table `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenants_parentId_fkey` (`parentId`);

--
-- Indexes for table `territories`
--
ALTER TABLE `territories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `territories_tenantId_idx` (`tenantId`),
  ADD KEY `territories_managerId_idx` (`managerId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_tenantId_email_key` (`tenantId`,`email`),
  ADD KEY `users_tenantId_idx` (`tenantId`),
  ADD KEY `users_email_idx` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `activities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `communications`
--
ALTER TABLE `communications`
  ADD CONSTRAINT `communications_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `communications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `contacts_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `deals`
--
ALTER TABLE `deals`
  ADD CONSTRAINT `deals_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `deals_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `deals_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `deals_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ebox_messages`
--
ALTER TABLE `ebox_messages`
  ADD CONSTRAINT `ebox_messages_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `erp_projects`
--
ALTER TABLE `erp_projects`
  ADD CONSTRAINT `erp_projects_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `erp_projects_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `erp_projects_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `erp_projects_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_candidates`
--
ALTER TABLE `hr_candidates`
  ADD CONSTRAINT `hr_candidates_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hr_employees`
--
ALTER TABLE `hr_employees`
  ADD CONSTRAINT `hr_employees_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD CONSTRAINT `inventory_items_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `erp_projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `knowledge_articles`
--
ALTER TABLE `knowledge_articles`
  ADD CONSTRAINT `knowledge_articles_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_convertedToContactId_fkey` FOREIGN KEY (`convertedToContactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `leads_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ledger_accounts`
--
ALTER TABLE `ledger_accounts`
  ADD CONSTRAINT `ledger_accounts_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `notes_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notes_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `production_orders`
--
ALTER TABLE `production_orders`
  ADD CONSTRAINT `production_orders_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD CONSTRAINT `purchase_orders_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales_orders`
--
ALTER TABLE `sales_orders`
  ADD CONSTRAINT `sales_orders_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_orders_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_orders_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `erp_projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_orders_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `support_tickets`
--
ALTER TABLE `support_tickets`
  ADD CONSTRAINT `support_tickets_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `support_tickets_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `support_tickets_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_assignedUserId_fkey` FOREIGN KEY (`assignedUserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_dealId_fkey` FOREIGN KEY (`dealId`) REFERENCES `deals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_leadId_fkey` FOREIGN KEY (`leadId`) REFERENCES `leads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tasks_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tenants`
--
ALTER TABLE `tenants`
  ADD CONSTRAINT `tenants_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `tenants` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `territories`
--
ALTER TABLE `territories`
  ADD CONSTRAINT `territories_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `territories_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_tenantId_fkey` FOREIGN KEY (`tenantId`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
