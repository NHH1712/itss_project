PGDMP         6            
    {            ITSS-HedSocial    15.3    15.3 A    K           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            L           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            M           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            N           1262    16860    ITSS-HedSocial    DATABASE     �   CREATE DATABASE "ITSS-HedSocial" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';
     DROP DATABASE "ITSS-HedSocial";
                postgres    false            �            1259    17020    alembic_version    TABLE     X   CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);
 #   DROP TABLE public.alembic_version;
       public         heap    postgres    false            �            1259    16992    comment_vote    TABLE     �   CREATE TABLE public.comment_vote (
    id integer NOT NULL,
    user_id integer NOT NULL,
    comment_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);
     DROP TABLE public.comment_vote;
       public         heap    postgres    false            �            1259    16991    comment_vote_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comment_vote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.comment_vote_id_seq;
       public          postgres    false    227            O           0    0    comment_vote_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.comment_vote_id_seq OWNED BY public.comment_vote.id;
          public          postgres    false    226            �            1259    16937    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    content character varying NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16936    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    221            P           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    220            �            1259    16957    post_tag    TABLE     u   CREATE TABLE public.post_tag (
    id integer NOT NULL,
    post_id integer NOT NULL,
    tag_id integer NOT NULL
);
    DROP TABLE public.post_tag;
       public         heap    postgres    false            �            1259    16956    post_tag_id_seq    SEQUENCE     �   CREATE SEQUENCE public.post_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.post_tag_id_seq;
       public          postgres    false    223            Q           0    0    post_tag_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.post_tag_id_seq OWNED BY public.post_tag.id;
          public          postgres    false    222            �            1259    16974 	   post_vote    TABLE     �   CREATE TABLE public.post_vote (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);
    DROP TABLE public.post_vote;
       public         heap    postgres    false            �            1259    16973    post_vote_id_seq    SEQUENCE     �   CREATE SEQUENCE public.post_vote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.post_vote_id_seq;
       public          postgres    false    225            R           0    0    post_vote_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.post_vote_id_seq OWNED BY public.post_vote.id;
          public          postgres    false    224            �            1259    16922    posts    TABLE     (  CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    image_url character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);
    DROP TABLE public.posts;
       public         heap    postgres    false            �            1259    16921    posts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.posts_id_seq;
       public          postgres    false    219            S           0    0    posts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
          public          postgres    false    218            �            1259    16903    tags    TABLE     [   CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.tags;
       public         heap    postgres    false            �            1259    16902    tags_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.tags_id_seq;
       public          postgres    false    215            T           0    0    tags_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;
          public          postgres    false    214            �            1259    16912    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    classname character varying NOT NULL,
    grade character varying NOT NULL,
    avatar_url character varying,
    cover_image_url character varying,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16911    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    217            U           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            �           2604    16995    comment_vote id    DEFAULT     r   ALTER TABLE ONLY public.comment_vote ALTER COLUMN id SET DEFAULT nextval('public.comment_vote_id_seq'::regclass);
 >   ALTER TABLE public.comment_vote ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    16940    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    16960    post_tag id    DEFAULT     j   ALTER TABLE ONLY public.post_tag ALTER COLUMN id SET DEFAULT nextval('public.post_tag_id_seq'::regclass);
 :   ALTER TABLE public.post_tag ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16977    post_vote id    DEFAULT     l   ALTER TABLE ONLY public.post_vote ALTER COLUMN id SET DEFAULT nextval('public.post_vote_id_seq'::regclass);
 ;   ALTER TABLE public.post_vote ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    16925    posts id    DEFAULT     d   ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
 7   ALTER TABLE public.posts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    16906    tags id    DEFAULT     b   ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);
 6   ALTER TABLE public.tags ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            �           2604    16915    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            H          0    17020    alembic_version 
   TABLE DATA           6   COPY public.alembic_version (version_num) FROM stdin;
    public          postgres    false    228   ,J       G          0    16992    comment_vote 
   TABLE DATA           W   COPY public.comment_vote (id, user_id, comment_id, created_at, updated_at) FROM stdin;
    public          postgres    false    227   VJ       A          0    16937    comments 
   TABLE DATA           Y   COPY public.comments (id, user_id, post_id, content, created_at, updated_at) FROM stdin;
    public          postgres    false    221   �J       C          0    16957    post_tag 
   TABLE DATA           7   COPY public.post_tag (id, post_id, tag_id) FROM stdin;
    public          postgres    false    223   QK       E          0    16974 	   post_vote 
   TABLE DATA           Q   COPY public.post_vote (id, user_id, post_id, created_at, updated_at) FROM stdin;
    public          postgres    false    225   �K       ?          0    16922    posts 
   TABLE DATA           c   COPY public.posts (id, user_id, title, description, image_url, created_at, updated_at) FROM stdin;
    public          postgres    false    219   
L       ;          0    16903    tags 
   TABLE DATA           (   COPY public.tags (id, name) FROM stdin;
    public          postgres    false    215   �N       =          0    16912    users 
   TABLE DATA           �   COPY public.users (id, name, username, password, classname, grade, avatar_url, cover_image_url, created_at, updated_at) FROM stdin;
    public          postgres    false    217   oO       V           0    0    comment_vote_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.comment_vote_id_seq', 2, true);
          public          postgres    false    226            W           0    0    comments_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.comments_id_seq', 6, true);
          public          postgres    false    220            X           0    0    post_tag_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.post_tag_id_seq', 15, true);
          public          postgres    false    222            Y           0    0    post_vote_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.post_vote_id_seq', 6, true);
          public          postgres    false    224            Z           0    0    posts_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.posts_id_seq', 8, true);
          public          postgres    false    218            [           0    0    tags_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.tags_id_seq', 10, true);
          public          postgres    false    214            \           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 11, true);
          public          postgres    false    216            �           2606    17024 #   alembic_version alembic_version_pkc 
   CONSTRAINT     j   ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);
 M   ALTER TABLE ONLY public.alembic_version DROP CONSTRAINT alembic_version_pkc;
       public            postgres    false    228            �           2606    16998    comment_vote comment_vote_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.comment_vote
    ADD CONSTRAINT comment_vote_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.comment_vote DROP CONSTRAINT comment_vote_pkey;
       public            postgres    false    227            �           2606    16945    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    221            �           2606    16962    post_tag post_tag_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.post_tag DROP CONSTRAINT post_tag_pkey;
       public            postgres    false    223            �           2606    16980    post_vote post_vote_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.post_vote
    ADD CONSTRAINT post_vote_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.post_vote DROP CONSTRAINT post_vote_pkey;
       public            postgres    false    225            �           2606    16930    posts posts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
       public            postgres    false    219            �           2606    16910    tags tags_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tags DROP CONSTRAINT tags_pkey;
       public            postgres    false    215            �           2606    16920    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           2606    16999 )   comment_vote comment_vote_comment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment_vote
    ADD CONSTRAINT comment_vote_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id);
 S   ALTER TABLE ONLY public.comment_vote DROP CONSTRAINT comment_vote_comment_id_fkey;
       public          postgres    false    227    221    3226            �           2606    17004 &   comment_vote comment_vote_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comment_vote
    ADD CONSTRAINT comment_vote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 P   ALTER TABLE ONLY public.comment_vote DROP CONSTRAINT comment_vote_user_id_fkey;
       public          postgres    false    217    3222    227            �           2606    16946    comments comments_post_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_post_id_fkey;
       public          postgres    false    219    3224    221            �           2606    16951    comments comments_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 H   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_user_id_fkey;
       public          postgres    false    217    221    3222            �           2606    16963    post_tag post_tag_post_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);
 H   ALTER TABLE ONLY public.post_tag DROP CONSTRAINT post_tag_post_id_fkey;
       public          postgres    false    219    3224    223            �           2606    16968    post_tag post_tag_tag_id_fkey    FK CONSTRAINT     z   ALTER TABLE ONLY public.post_tag
    ADD CONSTRAINT post_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id);
 G   ALTER TABLE ONLY public.post_tag DROP CONSTRAINT post_tag_tag_id_fkey;
       public          postgres    false    223    3220    215            �           2606    16981     post_vote post_vote_post_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.post_vote
    ADD CONSTRAINT post_vote_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);
 J   ALTER TABLE ONLY public.post_vote DROP CONSTRAINT post_vote_post_id_fkey;
       public          postgres    false    219    3224    225            �           2606    16986     post_vote post_vote_user_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.post_vote
    ADD CONSTRAINT post_vote_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 J   ALTER TABLE ONLY public.post_vote DROP CONSTRAINT post_vote_user_id_fkey;
       public          postgres    false    225    217    3222            �           2606    16931    posts posts_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_user_id_fkey;
       public          postgres    false    219    3222    217            H      x�34�L1�L6�H�������� (��      G   E   x�]ʱ�0��������0�d�9����,��hā(��a=#�u��}+߆cE���ȯmS�k��      A   �   x�M�-�@@a={�񤛙ٿv
�B�@ �Є��1H�@r�V�${V4����1x؝�����w�m��'�)���]d�tI�]Q�z�$�LAx�w��B�(6���.T�7�ߤ��yh���^�������N�X![.w��R_,h      C   ,   x��� 0�wn�J*�.���m�
�Rƹ.��mx�m�8      E   m   x�mʱ� �XT���5� A_����pb~ㅤ���pp'���_9����FM�i~77�����X�ލ{��y��5���M�|Z����n��ک��&g+#      ?   �  x��SKo�@>'�b� �~�vr�Bi�����\*��ce����=#T�PB4TUU��b���'�:%DBB�l���|/[�r�F�ܗ�)�CH(HVL�9�"{�ak���ž�����@ ��E�~Yx�A�/���"{�A�bz��O$�!֞(�3<��	>�������\��$+`/~F�DE�ZBRdc��
E6�K�[�I	w�@�_ba>�*l^y6��Iq\ �"{;g2R9�?Cse"��T�~�ο	��d������5��Q�"{�=S�F�5*(�S:��¤$]�dO3���FB���MS7}=��%\��Q�IcAF�t8�Qd�IB�d���J(H�b2��G��)��R|a(��`Ы���4�Y�h�N�fh�kx�y��*������F��K��~1=��g�T����G�R%�(���^5|��.��T��.A�,5R�P���s����u����X�PH�G�R'�7���]da`�oX��95�v�XxȢ������Ď�J���$*$��)���(�K4�D71�	}Րbs�SW�����Dy8�?a��-j�\���n	�<��h�����u��������G�`��c����7�L:�+SX�nz�4�B���lkk���\�P0�Q�q�K�F���t�5P|۶]���~ݵm�rf~��U�,�1�����a��e
�[�_���J�a:�ּ�U��W��j�j�ԓ�O      ;   a   x��K�0��{�A�O��E�$RW�A�����̂$������+�}�&#o��J4�+���ˑ'}�����҃/�b:bV�r�}Z���H��R      =     x���MJA��5���LOW���Ν ��U6C��N4�3xq#x�q��MlC�f������i|��v]V�$��p���T��4���#\k �IT�ڒ�!:⌴"���|VXh�4~d\X�����/8�P8�Lqn�9�hw����3aJ3��6� C������Β��s-J'3\{�j���� ��.�A:	�)m����X��:n�M���Х�-���B��E�?/ύ�ن�M�t7��=ˇ}�_.�U����IMZ?9gEQ|--�L     